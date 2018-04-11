import React from 'react';
import { connect } from 'react-redux';
//actions
import { addLetter, removeLetter, clearTitle, changeTitleText } from './actions/titleActions';
//components
import Background from './components/Background'
import Content from './components/Content';

class HomePage extends React.Component {
  componentDidMount() {
    window.innerWidth < 1024 ? this.resetTitleText() : this.lettering();
    window.addEventListener('resize', this.handleResizing);
  }
  lettering = () => {
    this.letteringTimeouts = [];
    (async () => {
      const { titleSentences } = this.props.titleState;
      while(true) {
        for(let sentence of titleSentences) {
          this.letters = sentence.split('');
          await this.letteringAnimation('add', 400, 50)
                    .then(() => this.letteringAnimation('remove', 4000, 20))
                    .catch(err => console.log(err));
        }
      }
    })();
  }
  resetTitleText = () => {
    this.props.changeTitleText('Do You want experience unforgottable moments? Find best bars near You!');
  }
  handleResizing = () => {
    this.cleaning();
    window.innerWidth >= 1024 ? this.lettering() : this.resetTitleText();
  }
  componentWillUnmount() {
    this.cleaning();
    window.removeEventListener('resize', this.handleResizing);
  }
  cleaning() {
    try {
      clearTimeout(this.actionTimeout);
      this.letteringTimeouts.forEach(timeout => clearTimeout(timeout));
      this.props.clearTitle();
    } catch(err) {
      console.log(err);
    }
  }
  letteringAnimation = (actionType, actionDelay, letteringDelay) => {
    return new Promise((resolve, reject) => {
      this.actionTimeout = setTimeout(() => {
        this.letters.forEach((letter, idx) => {
          this.letteringTimeouts.push(setTimeout(() => {
            actionType === 'add' ? this.props.addLetter(letter) : this.props.removeLetter();
            idx === this.letters.length - 1 && resolve();
          }, letteringDelay * idx));
        });
      }, actionDelay);
    });
  }
  render() {
    return (
        <div className="wrapper">
          <Background />
          <Content titleText={this.props.titleState.titleText} />
        </div>
    );
  }
};

 const mapStateToProps = store => ({
     titleState: store.titleReducer
 });

 export default connect(mapStateToProps, {addLetter: addLetter, removeLetter: removeLetter, clearTitle: clearTitle, changeTitleText: changeTitleText})(HomePage);
