import React from 'react';
import classes from "./card.module.css";

import profile from "../assets/images/Picture 1.png";
import phone from "../assets/images/phone.png";
import mail from "../assets/images/mail.png";

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Card = (props) => {

    const backCover = {
        background: `linear-gradient(90deg, ${props.color}, #FFFFFF)`
    }
    const topColor = {
        backgroundColor: `${props.color}`
    }
    const listBackCover = {
        backgroundColor: props.color
    }
  return (
    props.mode == 'grid' ? <li className={classes.card_body}>
        <section className={classes.background_cover} style={backCover}>
            <div style={topColor}></div>
            <div></div>
        </section>
        <div className={classes.content}>
            <div className={classes.name_section}>
                <h3>{props.name}</h3>
            </div>
            <div className={classes.image_section}>
                <img src={props.picture} height={80} width={80} style={{borderRadius: "50%"}} />
            </div>
            <div className={classes.info}>
                <h5>{props.city}</h5>
                <div className={classes.info_icons}>
                    <img src={mail} />
                    <img src={phone} />
                </div>
            </div>
        </div>
    </li> :
    props.mode == 'list' ? <li className={classes.list_card_body}>
    <section className={classes.list_background_cover} style={listBackCover}>
        <div style={topColor}></div>
        <div></div>
    </section>
    <div className={classes.list_content}>
        <div className={classes.user_info}>
        <div className={classes.list_image_section}>
            <img src={props.picture} height={60} width={60} style={{borderRadius: "50%"}} />
        </div>
        <div className={classes.list_name_section}>
            <h3>{props.name}</h3>
            <h5>{props.city}</h5>
        </div>
        </div>
        <div className={classes.list_info}>
                <img src={mail} />
                <img src={phone} />
        </div>
    </div>
</li> : null
  )
}

export default Card;
