var Signup = React.createClass({
    getInitialState: function () {
        return {
            skillList: null
        };
    },
    getSkillList: function () {
        $.ajax({
            url: HOST_NAME + "/api/users/skill_list",
            type: 'GET',
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({
                    skillList: data
                });
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.getSkillList()
    },
    render: function () {
        if (this.state.skillList == null) {
            return <div></div>
        }
        var skillList = this.state.skillList.map(function (skillName) {
            return new SkillCheckBoxContent(skillName, skillName);
        });
        return (
            <div className="row">
                <div className="col-xs-2"></div>
                <div className="col-xs-8">
                    <h2>Sign up</h2>

                    <form action="/users" method="POST">
                        <InputText name="user[email]"
                                   label="Email:"
                                   type="email"
                                   placeholder="****@gmail.com"/>
                        <InputText name="user[nickname]"
                                   label="ニックネーム"
                                   type="text"
                                   placeholder="hoge"/>
                        <InputText name="user[password]"
                                   label="パスワード（８文字以上）"
                                   type="password"
                                   placeholder="*********"/>
                        <InputText name="user[password_confirmation]"
                                   label="パスワード（８文字以上）"
                                   type="password"
                                   placeholder="*********"/>
                        <InputText name="user[skype_id]"
                                   label="SkypId"
                                   type="text"
                                   placeholder="hoge"/>
                        <SelectBox name="user[skill]"
                                   label="専門"/>
                        <SkillCheckBoxForm name="skill[]"
                                           skillList={skillList}/>
                        <input type="submit" value="Sign up" className="btn btn-success pull-right"/>
                    </form>
                </div>
                <div className="col-xs-2"></div>
            </div>
        );
    }
});

var InputText = React.createClass({
    render: function () {
        return (
            <div className="input-column">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <input type={this.props.type} className="form-control" id={this.props.name} name={this.props.name}
                       placeholder={this.props.placeholder}/>
            </div>
        );
    }
});

var SelectBox = React.createClass({
    render: function () {
        return (
            <div className="input-column">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select name={this.props.name} className="form-control" id={this.props.name}>
                    <option value="Engineer">エンジニア</option>
                    <option value="Designeer">デザイナー</option>
                </select>
            </div>
        );
    }
});

var SkillCheckBox = React.createClass({
    render: function () {
        return (
            <label className="checkbox-inline">
                <input name={this.props.name} type="checkbox" value={this.props.value}/>{this.props.label}
            </label>
        );
    }
});

var SkillCheckBoxForm = React.createClass({
    render: function () {
        self = this;
        var skillList = this.props.skillList.map(function (skill, index) {
            return (
                <SkillCheckBox name={self.props.name}
                               value={skill.name}
                               label={skill.name}
                               key={index}/>
            )
        });
        return (
            <div className="input-column">
                <label>スキル</label><br/>
                {skillList}
            </div>
        );
    }
});


var SkillCheckBoxContent = function (name, value) {
    this.name = name;
    this.value = value;
};

