import React from 'react';
import PurchaseBox from './PurchaseBox.jsx';
import Features from './Features.jsx';
import Interactives from './Interactives.jsx';
import CouponDefault from './CouponDefault.jsx';
import CouponForm from './CouponForm.jsx';
import ShareBox from './ShareBox.jsx';
import styles from '../styles/Sidebar.css';
import fixedStyles from '../styles/FixedSidebar.css';

class FixedSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCoupon: false,
      couponCode: null,
      pointerOnTrailer: false,
      couponFormInput: '',
    };
    this.couponClickHandler = this.couponClickHandler.bind(this);
    this.trailerHoverHandler = this.trailerHoverHandler.bind(this);
    this.couponInputChangeHandler = this.couponInputChangeHandler.bind(this);
    this.couponSubmitHandler = this.couponSubmitHandler.bind(this);
  }

  couponInputChangeHandler({ target: { value } }) {
    this.setState({
      couponFormInput: value,
    });
  }

  couponSubmitHandler(e) {
    e.preventDefault();
    if (this.state.couponFormInput === this.state.couponCode) {
      this.props.changePrice();
    }
  }

  couponClickHandler(couponCode) {
    this.setState({
      hasCoupon: true,
      couponCode,
    });
  }

  trailerHoverHandler() {
    this.setState({
      pointerOnTrailer: !this.state.pointerOnTrailer,
    });
  }

  render() {
    const { course, discountPrice } = this.props;
    let coupon;
    if (!this.state.hasCoupon) {
      coupon = <CouponDefault couponClickHandler={ this.couponClickHandler }
        active_coupon={ course.activeCoupon } />;
    } else {
      coupon = <CouponForm couponInputValue={ this.state.couponFormInput }
      couponInputChangeHandler={ this.couponInputChangeHandler }
      couponSubmitHandler={ this.couponSubmitHandler }/>;
    }

    return (
      <div className={ styles.rightCol }>
        <div className={ fixedStyles.fixedSideBarContainer }>
          <div className={ styles.belowTrailer }>
            <PurchaseBox discount_price={ discountPrice }
              list_price={ course.listPrice } />
            <Features video_hrs={ course.videoHrs } total_articles={ course.totalArticles }
            />
            <Interactives total_downloads={ course.totalDownloads }/>
            <section className={ styles.couponBox }>
              { coupon }
            </section>
            <ShareBox />
          </div>
        </div>
      </div>
    );
  }
}

export default FixedSidebar;
