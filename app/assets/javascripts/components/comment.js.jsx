var Comment = React.createClass({
    render: function () {
        return (
            <div id="main">
                <div id="jap">あと
                    <Timer targetDate={new Date(2015, 10, 29, 16, 0, 0).getTime()}/>
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

var Timer = React.createClass({
    getInitialState: function () {
        return {
            remainingTime: this.calculateRemainingTime()
        };
    },
    calculateRemainingTime: function () {
        var nowDate = new Date().getTime();
        var targetDate = this.props.targetDate;
        if (nowDate > targetDate) {
            return (
                <div className="timer">終了！</div>
            )
        }
        var diffDate = targetDate - nowDate;
        diffDate %= ( 1000 * 60 * 60 * 24 );
        var diffDays = diffDate / ( 1000 * 60 * 60 * 24 );
        diffDate %= ( 1000 * 60 * 60 * 24 );
        var diffHour = diffDate / ( 1000 * 60 * 60 );
        diffDate %= ( 1000 * 60 * 60 );
        var diffMinute = diffDate / ( 1000 * 60 );
        diffDate %= ( 1000 * 60 );
        var diffSecond = diffDate / 1000;

        return this.format2digits(diffDays) + ":"
            + this.format2digits(diffHour) + ":"
            + this.format2digits(diffMinute) + ":"
            + this.format2digits(diffSecond);
    },
    componentDidMount: function () {
        setInterval(this.setRemainingTime, 1000);
    },
    setRemainingTime: function () {
        this.setState({
            remainingTime: this.calculateRemainingTime()
        });
    },
    format2digits: function (num) {
        num = Math.floor(num);
        if (num < 10) {
            return "0" + num;
        }
        return num;
    },
    render: function () {
        return (
            <div className="timer">{this.state.remainingTime}</div>
        );
    }
});

var GroupInfo = React.createClass({
    getInitialState: function () {
        return ({
            memberList: []
        })
    },
    componentDidMount: function() {
      this.getComments();
    },
    getComments: function () {
        $.ajax({
            url: HOST_NAME + "/api/users/team_member",
            type: 'GET',
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({
                    memberList: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
                conole.error(xhr);
            }.bind(this)
        });
    },
    render: function () {
        var memberList = this.state.memberList.map(function(content, index) {
            return(
                <li key={index}>{content.nickname}({content.skype_id})</li>
            );
        });
        return (
            <div className="column">
                <h2>Member List(Skype)</h2>
                <ul className="member-list">
                    {memberList}
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
    addLineBrake: function (str) {
        return str.split("\n").map(function (line, index) {
            return <p key={index}>{line}</p>
        })
    },
    render: function () {
        return (
            <div className="comment">
                {this.addLineBrake(this.props.commnet)}
                <div className="comment-time">{this.props.time}</div>
            </div>
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
        var commentList = this.state.comments.map(function (comment, index) {
            return (<CommentNode commnet={comment["text"]}
                                 time={comment["created_at"]}
                                 key={index}/>)
        });
        return (
            <div className="comment-list">
                {commentList}
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
                cnosole.error(xhr);
            }.bind(this)
        });
        document.getElementById("comment_textarea").value = "";
    },
    render: function () {
        return (
            <form id={this.formId} className="comment-form">
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
                <h3>提出</h3>

                <form className="submit-modal">
                    <div className="input-column">
                        <label htmlFor="github-url">Github</label>
                        <input type="text" className="form-control" id="github-url"
                               placeholder="https://github.com/..."/>
                    </div>

                    <div className="input-column">
                        <label htmlFor="prezen-url">プレゼン</label>
                        <input type="text" className="form-control" id="prezen-url"
                               placeholder="https://drive.google.com/..."/>
                    </div>
                    <button className="btn btn-success modal-button pull-right">提出</button>
                    <button className="btn btn-danger modal-button pull-right">キャンセル</button>
                </form>
            </div>
        );
    }
});

var Submit = React.createClass({
    showModal: function (e) {
        e.preventDefault();
        $('#submit-modal').plainModal('open', {overlay: {color: '#000', opacity: 0.5}});
    },
    render: function () {
        return (
            <div>
                <p className="center-img" onClick={this.showModal}>
                    <img className="large-button" src="/assets/submit.png"/>
                </p>
                <ModalForm />
            </div>
        );
    }
});

