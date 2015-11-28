var Comment = React.createClass({
    render: function () {
        return (
            <div id="main">
                <div id="jap">あと
                    <div id="RealtimeCountdownArea" className="timer"></div>
                    <Submit />
                </div>
                <div className="row">
                    <div className="col-xs-2"></div>
                    <div className="col-xs-4">
                        <CompanyInfo />
                        <GroupInfo />
                    </div>
                    <div className="col-xs-4">
                        <CommentBox/><br/><br/><br/>
                    </div>
                    <div className="col-xs-2"></div>
                </div>
            </div>
        );
    }
});

var HOST_NAME = "http://localhost:3000";

var GroupInfo = React.createClass({
    render: function () {
        return (
            <div className="column">
                <h2>Member List(Skype)</h2>
                <ul className="member-list">
                    <li>大場 達也(toba)</li>
                    <li>大場 達也(toba)</li>
                    <li>大場 達也(toba)</li>
                    <li>大場 達也(toba)</li>
                    <li>大場 達也(toba)</li>
                </ul>
            </div>
        );
    }
});

var CompanyInfo = React.createClass({
    render: function () {
        return (
            <div className="column">
                <h2>HACKER WARS</h2>
                <div className="descritpion">
                    <p>遊んで遊んで遊びまくれ！</p>
                    <p>遊んで遊んで遊びまくれ！</p>
                    <p>遊んで遊んで遊びまくれ！</p>
                    <p>遊んで遊んで遊びまくれ！</p>
                    <p>遊んで遊んで遊びまくれ！</p>
                </div>
            </div>
        );
    }
});

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
        //setInterval(this.getComments, 1000);
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
        var commentList = this.state.comments.map(function (comment, index) {
            return (<CommentNode commnet={comment["text"]}
                                 time={comment["created_at"]}
                                 key={index}/>)
        });
        return (
            <div className="comment-list">
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

var CommentBox = React.createClass({
    event_id: 1,
    render: function () {
        return (
            <div className="column">
                <h2>会場の叫び</h2>
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
                    <label for="github_url">GitHub</label><input type="text" placeholder="url" name="github_url"/><br/>
                    <label for="plezen_url">プレゼン</label><input type="text" placeholder="url" name="plezen_url"/>
                    <button className="btn btn-success btn-block">提出</button>
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
                <p className="center-img" onClick={this.showModal}><img className="large-button"
                                                                        src="/assets/submit.png"/></p>
                <ModalForm />
            </div>
        );
    }
});

