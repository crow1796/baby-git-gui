import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import * as Actions from '@/actions/babygit'
import './babygit.scss'

class BabyGit extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            projects: {}
        }
        this.props.getAllProjects()
            .then((response) => {
                this.setState({
                    projects: response.payload.projects
                })
            })
    }

    componentDidMount(){
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
        return _.map(this.state.projects, (project, key) => {
            return (
                <div className="accordion js-accordion" key={ key }>
                    <div className="accordion__item js-accordion-item">
                        <div className="accordion-header js-accordion-header">{ project.name }</div>
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

    renderEnvironmentsOf(project, projectKey){
        return _.map(project.environments, (environment, key) => {
            return (
                <div className="accordion__item js-accordion-item" key={ key }>
                    <div className="accordion-header js-accordion-header">{ environment.name }</div>
                    <div className="accordion-body js-accordion-body">
                        <div className="accordion-body__contents">
                            <div className="environment-group">
                                <input type="text" 
                                className="field" 
                                placeholder="Enter Branch Name"
                                name={ key }
                                onChange={(e) => this.handleChange(e, projectKey, key) }/>
                                <button type="button" className="button" onClick={(e) => this.checkOut(projectKey, key) }>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    handleChange(e, projectKey, key){
        let newVal = this.state.projects
        if (e.target.getAttribute('type') === 'checkbox') {
            newVal[projectKey].environments[key].branch = e.target.checked
        } else {
            newVal[projectKey].environments[key].branch = e.target.value
        }
        this.setState({
            projects: newVal
        })
    }

    checkOut(projectKey, key){
        let url = this.state.projects[projectKey].environments[key].url
        let branch = this.state.projects[projectKey].environments[key].branch
        if(!branch){
            toast.error("Please enter a branch name.", {
                position: toast.POSITION.TOP_CENTER,
                closeButton: false,
                hideProgressBar: true,
                className: '-toast'
            })
            return false
        }
        url = url + "repo/deploy/add/" + this.props.apiKey + "/" + this.state.projects[projectKey].name + "/" + branch + "/"
        axios.get(url)
            .then((response) => {
                toast.error('Success', {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: true,
                    className: '-toast'
                })
            })
            .catch((response) => {
                toast.error(`Error: ${response.message}. Please try again.`, {
                    position: toast.POSITION.TOP_CENTER,
                    closeButton: false,
                    hideProgressBar: true,
                    className: '-toast'
                })
            })
    }

    render(){
        return (
            <div id="baby-git">
                <ToastContainer />
                { this.renderProjects() }
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