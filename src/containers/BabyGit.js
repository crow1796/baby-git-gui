import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import * as Actions from '@/actions/babygit'
import Rodal from 'rodal'
import 'rodal/lib/rodal.css'
const { session } = window.require('electron').remote

const Spinner = (props) => {
    if(!props.loading) return false
    return (
        <div className="loader loader--style1" title="0">
            <svg version="1.1" id="loader-1" x="0px" y="0px"
            width="40px" height="40px" viewBox="0 0 40 40" enableBackground="new 0 0 40 40">
            <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
            <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 20 20"
                to="360 20 20"
                dur="0.5s"
                repeatCount="indefinite"/>
                </path>
            </svg>
        </div>
    )
}

const CheckOutButton = (props) => {
    if (props.environment.is_locked && localStorage.getItem('bbggui_name') != props.environment.user) return ''
    return (
        <button
            type="button"
            className="button"
            onClick={(e) => props.onClick(props.environment.domain, props.project, props.envKey)}>
            Checkout
            </button>
    )
}

class BabyGit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isLoading: true,
            projects: {},
            namePrompt: false,
            name: localStorage.getItem('bbggui_name') ? localStorage.getItem('bbggui_name') : '',
            lockConfirmation: false,
            lockInfo: null,
            queues: {}
        }
        let ref = firebase.database().ref('projects')
        ref.on('value', (snapshot) => {
            this.props.setProjects(snapshot.val())
            this.setState({
                isLoading: false
            })
        })
        ref.once('value', (snapshot) => this.__initAccordion())

        let envUsersRef = firebase.database()
                                    .ref('env_users')
        envUsersRef.on('child_added', (snapshot) => {
            envUsersRef.child(`${snapshot.key}/environments`)
                        .on('child_added', (cSnapshot) => {
                            envUsersRef.child(`${snapshot.key}/environments/${cSnapshot.key}`)
                                        .on('child_added', (gSnapshot) => {
                                            let projectKey = snapshot.key
                                            let envKey = cSnapshot.key
                                            let newRequest = gSnapshot.val()
                                            let queues = JSON.parse(JSON.stringify(this.state.queues))
                                            _.set(queues, `${projectKey}.${envKey}`, {
                                                ..._.get(queues, `${projectKey}.${envKey}`) || {},
                                                [gSnapshot.key]: newRequest
                                            })

                                            this.setState({
                                                queues
                                            })
                                            
                                            if (newRequest == this.state.name) return false
                                            new Notification('Unlock Request', {
                                                body: `${gSnapshot.val()} wants to unlock ${snapshot.val().name}'s ${cSnapshot.key} environment`
                                            })
                                        })
                            envUsersRef.child(`${snapshot.key}/environments/${cSnapshot.key}`)
                                        .on('child_removed', (gSnapshot) => {
                                            let queues = JSON.parse(JSON.stringify(this.state.queues))
                                            delete queues[snapshot.key][cSnapshot.key][gSnapshot.key]

                                            this.setState({
                                                queues
                                            })
                                        })
                            envUsersRef.child(`${snapshot.key}/environments/${cSnapshot.key}`)
                                .on('value', (gSnapshot) => {
                                    let queues = JSON.parse(JSON.stringify(this.state.queues))
                                    queues[snapshot.key][cSnapshot.key] = gSnapshot.val()

                                    this.setState({
                                        queues
                                    })
                                })
                        })
        })
        
        this.hideNamePrompt = this.hideNamePrompt.bind(this)
        this.hideLockConfirmation = this.hideLockConfirmation.bind(this)
        this.checkOut = this.checkOut.bind(this)
        this.confirmLocking = this.confirmLocking.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.saveName = this.saveName.bind(this)
    }

    componentDidMount(){
        if (!localStorage.getItem('bbggui_name')) {
            this.setState({
                namePrompt: true
            })
        }
    }

    __initAccordion(){
        var accordion = (function () {

            var $accordion = $('.js-accordion');
            var $accordion_header = $accordion.find('.js-accordion-header');
            var $accordion_item = $('.js-accordion-item');

            // default settings 
            var settings = {
                // animation speed
                speed: 400,

                // close all other accordion items if true
                oneOpen: false
            };

            return {
                // pass configurable object literal
                init: function ($settings) {
                    $accordion_header.on('click', function () {
                        accordion.toggle($(this));
                    });

                    $.extend(settings, $settings);

                    // ensure only one accordion is active if oneOpen is true
                    if (settings.oneOpen && $('.js-accordion-item.active').length > 1) {
                        $('.js-accordion-item.active:not(:first)').removeClass('active');
                    }

                    // reveal the active accordion bodies
                    $('.js-accordion-item.active').find('> .js-accordion-body').show();
                },
                toggle: function ($this) {

                    if (settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
                        $this.closest('.js-accordion')
                            .find('> .js-accordion-item')
                            .removeClass('active')
                            .find('.js-accordion-body')
                            .slideUp()
                    }

                    // show/hide the clicked accordion item
                    $this.closest('.js-accordion-item').toggleClass('active');
                    $this.next().stop().slideToggle(settings.speed);
                }
            }
        })();

        $(document).ready(function () {
            accordion.init({ speed: 300, oneOpen: true });
        });
    }

    renderProjects(){
        return _.map(this.props.projects, (project, key) => {
            return (
                <div className="accordion js-accordion" key={ key }>
                    <div className="accordion__item js-accordion-item">
                        <div className="accordion-header js-accordion-header">
                            { project.name }
                        </div>
                        <div className="accordion-body js-accordion-body">
                            <div className="accordion js-accordion">
                                { this.renderEnvironmentsOf(project, key) }
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderInUseOf(environment){
        if (environment.is_locked) return <span className="tag">In Use By <strong>{environment.user == this.state.name ? 'You' : environment.user }</strong></span>
    }

    renderQueuesOf(projectKey, envKey){
        let queues = _.get(this.state.queues, `${projectKey}.${envKey}`)
        if (!queues || _.isEmpty(queues)) return false
        
        return (
            <span className="tag -is-danger">{ Object.keys(queues).length } Queue</span>
        )
    }

    renderRemoveButton(index, projectKey, envKey){
        return (
            this.state.queues[projectKey][envKey][index] == this.state.name ? 
            <button type="button"
                className="is-danger"
                onClick={(e) => this.removeQueuedUserFrom(index, projectKey, envKey)}>
                Remove
            </button> : false
        )
    }
    
    renderPassButton(index, projectKey, envKey){
        return (
            (this.props.projects[projectKey].environments[envKey].user == this.state.name) ?
                <button type="button"
                    className="is-success"
                    onClick={(e) => this.passToUser(index, projectKey, envKey)}>
                    Pass
            </button> : false
        )
    }

    renderRequests(projectKey, envKey) {
        let queues = _.get(this.state.queues, `${projectKey}.${envKey}`)
        if(!queues || _.isEmpty(queues)) return false
        return (
            <div className="environment-requests">
                <div className="title">
                    Requests
                </div>
                { _.map(queues, (user, index) => {
                    return (
                        <div className={`user ${this.state.queues[projectKey][envKey][index] != this.state.name && this.props.projects[projectKey].environments[envKey].user != this.state.name ? '-is-empty' : ''}` } key={index}>
                            <div className="name">
                                {user}
                            </div>
                            <div className="actions">
                                { this.renderRemoveButton(index, projectKey, envKey) }
                                {this.renderPassButton(index, projectKey, envKey) }
                            </div>
                        </div>
                    )
                }) }
            </div>
        )
    }

    renderCurrentUserOf(environment){
        if(!environment.is_locked) return false
        return (
            <span className="user-name" title={environment.user}>
                { environment.user }
            </span>
        )
    }

    renderEnvironmentsOf(project, projectKey){
        return _.map(project.environments, (environment, key) => {
            return (
                <div className="accordion__item js-accordion-item" key={ key }>
                    <div className="accordion-header js-accordion-header">
                        { environment.name }
                        { this.renderInUseOf(environment) }
                        { this.renderQueuesOf(projectKey, key) }
                    </div>
                    <div className="accordion-body js-accordion-body">
                        <div className="accordion-body__contents">
                            <div className="environment-group">
                                <input type="text" 
                                className="field" 
                                placeholder="Enter Branch Name"
                                name={ key }
                                value={ this.props.projects[projectKey].environments[key].branch }
                                onChange={(e) => this.handleChange(e, projectKey, key) }
                                disabled={ environment.is_locked && (environment.user != this.state.name) }/>
                                <button type="button" 
                                    className={environment.is_locked && this.state.name != environment.user ? 'button -is-white -fill' : 'button -is-white' } 
                                onClick={(e) => this.lockEnvOf(e, projectKey, key)}>
                                    <div className={
                                        environment.is_locked ? 'icon-lock' : 'icon-lock -unlocked'
                                    }>
                                        <div className="lock-top-1"></div>
                                        <div className="lock-top-2"></div>
                                        <div className="lock-body"></div>
                                        <div className="lock-hole"></div>
                                    </div>
                                </button>
                                <CheckOutButton project={projectKey}
                                    environment={environment}
                                    envKey={key}
                                    onClick={this.checkOut} />
                            </div>
                            {this.renderRequests(projectKey, key)}
                        </div>
                    </div>
                </div>
            )
        })
    }

    handleChange(e, projectKey, key){
        let newVal = this.props.projects
        if (e.target.getAttribute('type') === 'checkbox') {
            newVal[projectKey].environments[key].branch = e.target.checked
        } else {
            newVal[projectKey].environments[key].branch = e.target.value
        }
        this.setState({
            projects: newVal
        })
    }

    lockEnvOf(e, projectKey, env){
        e.stopPropagation()
        let tmpProjects = this.props.projects
        if (tmpProjects[projectKey].environments[env].user != localStorage.getItem('bbggui_name') && !this.state.lockInfo && tmpProjects[projectKey].environments[env].is_locked){
            this.setState({
                lockConfirmation: true,
                lockInfo: {
                    projectKey,
                    env
                }
            })
            return false
        }
        tmpProjects[projectKey].environments[env].is_locked = !tmpProjects[projectKey].environments[env].is_locked
        this.props.lockEnvOf(projectKey, env, tmpProjects[projectKey].environments[env].is_locked)
    }
    
    checkOut(domain, projectKey, key){
        let url = this.props.projects[projectKey].environments[key].url
        let branch = this.props.projects[projectKey].environments[key].branch
        let isLocked = this.props.projects[projectKey].environments[key].is_locked
        if(!branch){
            toast.error("Please enter a branch name.", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: true,
                className: '-toast'
            })
            return false
        }
        if(isLocked){
            toast.error("Environment is currently locked. Please try again later.", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: true,
                className: '-toast'
            })
            return false
        }
        this.setState({ isLoading: true })
        url = url + "repo/deploy/add/" + this.props.apiKey + "/" + domain + "/" + branch + "/"
        axios.get(url)
            .then((response) => {
                toast.success('Success', {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: true,
                    className: '-toast'
                })
                this.props.updateBranch(projectKey, key, branch)
                this.setState({ isLoading: false })
            })
            .catch((response) => {
                toast.error(`Error: ${response.message}. Please try again. Server Response: ${response.data}`, {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: true,
                    className: '-toast'
                })
                this.setState({ isLoading: false })
            })
    }

    hideNamePrompt(e){
        this.setState({
            namePrompt: false
        })
    }

    handleNameChange(e){
        this.setState({
            name: e.target.value
        })
    }

    saveName(e){
        e.preventDefault()
        if(!this.state.name.trim()){
            return false
        }
        localStorage.setItem('bbggui_name', this.state.name)
        this.setState({
            namePrompt: false
        })
    }
    
    renderNamePromptModal(){
        return (
            <Rodal visible={this.state.namePrompt} 
                    onClose={this.hideNamePrompt}
                    showCloseButton={false}
                    closeOnEsc={false}
                    closeMaskOnClick={false}
                    height={130}>
                    <div>
                        < form onSubmit = { this.saveName } >
                            <h2>Please enter your name</h2>
                            <input type="text"
                                className="field"
                                placeholder="Enter Your Name"
                                onChange={ this.handleNameChange }/>
                            <div>
                                <button type="submit" className="button" onClick={ this.saveName }>
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </Rodal>   
        )
    }

    hideLockConfirmation(){
        this.setState({
            lockConfirmation: false,
            lockInfo: null
        })
    }

    /**
     * Fires if 'Yes' is clicked
     * @param {Event} e 
     */
    confirmLocking(e){
        let projectKey = this.state.lockInfo.projectKey
        let env = this.state.lockInfo.env
        
        let tmpProjects = this.props.projects
        this.setState({
            isLoading: true,
            lockInfo: null
        })
        
        this.setState({
            isLoading: false
        })
        this.hideLockConfirmation()

        let devQueues = _.get(this.state.queues, `${projectKey}.${env}`)
        devQueues = _.map(devQueues, (user, index) => {
            return {
                name: user,
                key: index
            }
        })
        let found = _.find(devQueues, {
            name: this.state.name
        })
        if(found) return false
        // if(found) this.removeQueuedUserFrom(found.key, projectKey, env)
        this.props.addToQueueOf(projectKey, env)
    }

    removeQueuedUserFrom(userKey, projectKey, envKey){
        this.props.removeQueuedUserFrom(userKey, projectKey, envKey)
    }

    passToUser(userKey, projectKey, envKey){
        let queues = _.get(this.state.queues, `${projectKey}.${envKey}`)
        if (!queues || _.isEmpty(queues)) return false
        this.props.passToUser(queues[userKey], userKey, projectKey, envKey)
    }

    renderLockConfirmation(){
        return (
            <Rodal visible={this.state.lockConfirmation} 
                    onClose={this.hideLockConfirmation}
                    height={130}>
                <div>
                    <h2>This env. is still in use, are you sure you want to unlock it?</h2>
                    <div className="confirm-buttons">
                        <button type="button" 
                            className="button -outlined"
                            onClick={ this.hideLockConfirmation }>
                            No
                        </button>
                        <button type="button" 
                                className="button"
                                onClick={ this.confirmLocking }>
                            Yes
                        </button>
                    </div>
                </div>
            </Rodal>
        )
    }

    render(){
        return (
            <div id="baby-git">
                <ToastContainer />
                <Spinner loading={ this.state.isLoading }/>
                { this.renderProjects() }
                { this.renderNamePromptModal() }
                { this.renderLockConfirmation() }
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        apiKey: state.babygit.apiKey,
        projects: state.babygit.projects
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Actions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BabyGit)