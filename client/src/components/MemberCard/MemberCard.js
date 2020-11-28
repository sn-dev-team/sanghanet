import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UIcontext } from '../contexts/UIcontext/UIcontext';
import AnyUserNameWrapper from '../NameWrappers/AnyUserName/AnyUserNameWrapper'
import './MemberCard.scss';

const MemberCard = (props) => {
    const { index, profileImg, firstName, lastName, spiritualName, showMemberPopup, activeMember } = props;
    const showMemberDetails = () => { showMemberPopup(index); };
    const { memberCardButton } = useContext(UIcontext).dictionary;
    const { SEESHAREDDATA } = memberCardButton;

    return (
        <li className={`member-card ${activeMember ? 'active-member' : ''}`}>
            <div className="profile-img">
                <img src={profileImg} alt="Avatar" />
            </div>
            <div className="member-content">
                <p className="card-name">
                    <AnyUserNameWrapper
                        firstName={firstName}
                        lastName={lastName}
                    />
                </p>
                <hr className="card-line"></hr>
                <p className="card-spiritual-name">{spiritualName}</p>
            </div>
            <button onClick={showMemberDetails}>{SEESHAREDDATA}</button>
        </li>
    );
};

MemberCard.propTypes = {
    index: PropTypes.number.isRequired,
    profileImg: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    spiritualName: PropTypes.string.isRequired,
    showMemberPopup: PropTypes.func.isRequired,
    activeMember: PropTypes.bool.isRequired
};

export default MemberCard;
