import React from 'react';
import './App.scss';

import tumblrImg from './imgs/tumblr.png';
import twiterImg from './imgs/twiter.png';

const urlQuotes = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

export default class App extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        quotes : [],
        quote : '',
        author : '',
        btnNewQuoteState: 'back-quote-init'
      }
  
      this.newQuote = this.newQuote.bind(this);
      this.createLinkTwitter = this.createLinkTwitter.bind(this);
      this.createLinkTumblr = this.createLinkTumblr.bind(this);
      this.loadColors = this.loadColors.bind(this);
      this.handleAnimation = this.handleAnimation.bind(this);
    }
  
    newQuote(){
      let elem = this.state.quotes[Math.floor(Math.random()*102)];
      this.setState({
        quote : elem.quote,
        author : elem.author,
        btnNewQuoteState : 'back-quote-requested'
      })

      /* reset state of requesting animation */
      setTimeout(()=>{
        this.setState({
            btnNewQuoteState: 'back-quote-waiting'
          })
      },1000)

      this.loadColors();
    }
  
    componentDidMount(){
      let numRandom = Math.floor(Math.random()*102);
  
      fetch(urlQuotes)
      .then(results => results.json())
      .then(item =>this.setState({
        quotes : item.quotes,
        quote : item.quotes[numRandom].quote,
        author : item.quotes[numRandom].author
      }))
    }
  
    loadColors(){
      let num = [1,2,3];
      for(let i=0; i<num.length;i++){
        num[i] = Math.floor(Math.random()*360);
      }
  
      let back = document.getElementsByClassName("block-frame")[0];
      let buttons = document.getElementsByClassName("button-share");
      let backNewQuoteBtn = document.getElementById("back-quote");
  
      for(let i=0 ; i<buttons.length ; i++){
        buttons[i].style.backgroundColor = "rgb("+num[0]+","+num[1]+","+num[2]+")";
      }
  
      back.style.backgroundColor = "rgb("+num[0]+","+num[1]+","+num[2]+")";
      backNewQuoteBtn.style.backgroundColor = "rgb("+num[0]+","+num[1]+","+num[2]+")";
    }

    handleAnimation(e){
        if(e.type === "mouseenter"){
            this.setState({
                btnNewQuoteState: 'back-quote-waiting'
            })
        }else if (e.type === "mouseleave"){
            this.setState({
                btnNewQuoteState: 'back-quote-init'
            })
        }
    }  

    createLinkTwitter(){
      return 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.state.quote + '"-' + this.state.author);
    }
    createLinkTumblr(){
      return "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+
      encodeURIComponent(this.state.author) +
      '&content=' +
      encodeURIComponent(this.state.quote) +
      '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button';
    }
  
    render() {
  
      let twitterLink = this.createLinkTwitter();
      let tumblrLink = this.createLinkTumblr();
  
      return (
        <main className="block-frame">
          <section id="quote-box">
            <q id="text">{this.state.quote}</q>
            <p id="author">-{this.state.author}</p>
            <div className="buttons">

                <a className="button-share" id="tweet-quote" 
                                            href={twitterLink}
                                            target="_blank"
                                            rel="noreferrer" >

                    <img  
                            src={twiterImg} 
                            alt='button to post on twiter the quote'/>
                </a>  

                <a className="button-share" href={tumblrLink} target="_blank" rel="noreferrer">
                    <img src={tumblrImg} alt='button to post on tumblr the quote'/>
                </a>

                <button className="button-new-quote" 
                        onMouseEnter={this.handleAnimation}
                        onMouseLeave={this.handleAnimation}
                        onClick={this.newQuote} 
                        id="new-quote">
                    New Quote
                    <span className={`back-quote ${this.state.btnNewQuoteState}`} id="back-quote"></span>
                </button>  
            </div>
          </section>
          <a className="contact" href="mailto:Jonhvelasco3@gmail.com">by Jonh Gomez</a>
        </main>
      );
    }
  }