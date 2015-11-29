var Ranking = React.createClass({
    setState: function () {
        return {
            openGroup: null
        }
    },
    getGroupData: function () {
        var groupList = [];
        groupList.push(["Kaleidoscope", "https://github.com/pocke/kaleidoscope", "url"]);
        groupList.push(["MILLENNIUM", "https://github.com/pocke/kaleidoscope", "url"]);
        groupList.push(["X-WING", "https://github.com/pocke/kaleidoscope", "url"]);
        groupList.push(["SNOWSPEEDER", "https://github.com/pocke/kaleidoscope", "url"]);
        groupList.push(["SPEEDER BIKE", "https://github.com/pocke/kaleidoscope", "url"]);
        return groupList;
    },
    render: function () {
        var groupList = this.getGroupData().map(function (group, index) {
            return (
                <GroupAchievement rank={index + 1}
                                  companyName={group[0]}
                                  githubUrl={group[1]}
                                  sridUrl={group[2]}
                                  key={index}/>
            );
        });
        return(
            <div>{groupList}</div>
        );
    }
});

var GroupAchievement = React.createClass({
    render: function () {
        var rank;
        if (this.props.rank <= 3) {
            rank = <img src={"/assets/rank0" + this.props.rank + ".png"}/>
        } else {
            rank = <strong>{this.props.rank}</strong>
        }
        return (
            <div>
                <h2>{rank + this.props.companyName}</h2>
            </div>
        );
    }
});