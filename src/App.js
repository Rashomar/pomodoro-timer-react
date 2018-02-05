import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      points:0,
      isNull: false,
      audioText:"",
      time: null,
      disabled:false,
      timerName:null
    };

    this.startTimer = this.startTimer.bind(this);
    this.pauseTime = this.pauseTime.bind(this);
    this.stopTime = this.stopTime.bind(this);
    this.checkMinute = this.checkMinute.bind(this);
    this.checkSecond = this.checkSecond.bind(this);
    this.myStopFunction = this.myStopFunction.bind(this);
    this.update = this.update.bind(this);

  }

  componentDidMount(){
    const time = this.props.time;
    this.setState({
      time,
    }) 
  }

  update(){
    if(this.state.isNull){
      this.startTimer();
      this.setState({
        time:this.props.time
      });
    }else{
      this.startTimer();
    }
  }

  startTimer(e){

    this.setState({
      audioText: "Keep Going!",
      disabled: true,
      isNull: false,
    });
    
    let presentTime = this.state.time;
    let timeArray = presentTime.split(/[:]+/);
    let m = this.checkMinute(timeArray[0] - 0);
    let s = this.checkSecond((timeArray[1] - 1));

     if(s==59){
        m=m-1;
        if(m<10){
          m="0"+m;
        }
      }

      this.setState({
        time: m + ":" + s
      })
      document.title = this.state.time;
      this.state.timerName = setTimeout(this.startTimer, 1000);

      if(m==0 && s==0){
        this.myStopFunction();
        let score = this.state.points;
        score += 25;
        this.setState({
          disabled:false,
          isNull: true,
          points: score,
          audioText : <iframe width="400p" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/89201472&amp;color=%23ff5500&amp;auto_play=true&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true&amp;visual=true"></iframe> 
        })
      }
  }


  pauseTime(){
    if(this.state.disabled){
    this.setState({
      audioText: "Are you kidding me?",
      disabled: false
    });
    this.myStopFunction();
    }
  }

  stopTime(){
    this.setState({
      audioText: "",
      disabled: false,
      time:this.props.time,
    })
    document.title = this.props.title;
    this.myStopFunction();
  }

  myStopFunction() {
    clearTimeout(this.state.timerName);
  }

  checkMinute(min){
    if(min<=9){
      min = "0" + min;
    }
    return min;
  }

  checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; 
    if (sec < 0) {sec = "59"};
    return sec;
  }



  render() {
    return (
      <div id="wrapper">
        <div id="timer">{this.state.time}</div>
        <button id="start" disabled={this.state.disabled} onClick={this.update}>Start</button>
        <button id="pause" onClick={this.pauseTime}>Pause</button>
        <button id="stop" onClick={this.stopTime}>Stop</button>
        <div id="audio">{this.state.audioText}</div>
        <div id="points">FlowPoints:{this.state.points}</div>
      </div>
    );
  }
}

App.defaultProps = {
  time: 25 + ":" + "0"+0,
  title: document.title
}


export default App;
