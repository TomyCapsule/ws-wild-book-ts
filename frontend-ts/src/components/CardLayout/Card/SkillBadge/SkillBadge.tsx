import { Grade } from "../../../../types/Grade";
import styles from "./SkillBadge.module.css";
import PropTypes from 'prop-types';

interface SkillBadgeProps extends Grade {}

const SkillBadge = ({ title, votes } : SkillBadgeProps) => {
  return (
    <li>
      {title}
      <span className={styles.votes}>{votes}</span>
    </li>
  );
};

SkillBadge.propTypes = {
  title: PropTypes.string,
  votes: PropTypes.number
}

export default SkillBadge;
