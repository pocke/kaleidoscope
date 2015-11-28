var Comment = React.createClass({

  render: function() {
    return (
        <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-6">
                <CommentBox/>
                <br/>
                <br/>
                <br/>
                <Submit />
            </div>
            <div className="col-xs-3"></div>
        </div>
    );
  }
});

var HOST_NAME = "http://localhost:3000";

var CommentNode = React.createClass({
    render: function () {
        return (
            <tr>
                <td>
                    <p>{this.props.commnet}</p>
                    <time className="pull-right">{this.props.time}</time>
                </td>
            </tr>
        )
    }
});

var CommentList = React.createClass({
    getInitialState: function () {
        return {
            comments: []
        };
    },
    componentDidMount: function () {
        this.getComments();
        setInterval(this.getComments, 1000);
    },
    getComments: function () {
        $.ajax({
            url: HOST_NAME + "/api/comments?event_id=" + this.props.event_id,
            type: 'GET',
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({
                    comments: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
    },
    render: function () {
        var style = {
            height: 300,
            overflowY: "scroll"
        };
        var commentList = this.state.comments.map(function (comment, index) {
            return (<CommentNode commnet={comment["text"]}
                             time={comment["created_at"]}
                             key={index}/>)
        });
        return (
            <div style={style}>
                <table className="table">
                    <tbody>{commentList}</tbody>
                </table>
            </div>
        );
    }
});


var CommentForm = React.createClass({
    formId: "comment",
    updateComment: function (e) {
        e.preventDefault();
        $.ajax({
            url: HOST_NAME + "/api/comments",
            type: 'POST',
            data: $("#" + this.formId).serialize(),
            dataType: "json",
            cache: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (data) {
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
        document.getElementById("comment_textarea").value = "";
    },
    render: function () {
        return (
            <form id={this.formId}>
                <input type="hidden" name="event_id" value={this.props.event_id}/>
                <textarea className="form-control" rows="3" name="text" id="comment_textarea"></textarea>
                <button onClick={this.updateComment} className="btn btn-primary pull-right">送信</button>
            </form>
        );
    }
});

var App = React.createClass({

    getInitialState: function () {
        return {modalIsOpen: false};
    },

    openModal: function () {
        this.setState({modalIsOpen: true});
    },

    closeModal: function () {
        this.setState({modalIsOpen: false});
    },

    render: function () {
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>

                    <h2>Hello</h2>
                    <button onClick={this.closeModal}>close</button>
                    <div>I am a modal</div>
                    <form>
                        <input />
                        <button>tab navigation</button>
                        <button>stays</button>
                        <button>inside</button>
                        <button>the modal</button>
                    </form>
                </Modal>
            </div>
        )
    }
});
var CommentBox = React.createClass({
    event_id: 1,
    render: function () {
        return (
            <div>
                <h3>会場の叫び</h3>
                <CommentList event_id={this.event_id}/>
                <CommentForm event_id={this.event_id}/>
            </div>
        )
    }
});

var ModalForm = React.createClass({
    render: function () {
        return (
            <div id="submit-modal">
                <form>
                    <input type="text"/>
                    <input type="text"/>
                </form>
            </div>
        );
    }
});

var Submit = React.createClass({
    showModal: function (e) {
        e.preventDefault();
        $('#submit-modal').plainModal('open', {overlay: {color: '#fff', opacity: 0.5}});
    },
    render: function () {
        return (
            <div>
                <ModalForm />
                <button onClick={this.showModal} className="btn btn-success btn-block">提出</button>
            </div>
        );
    }
});
