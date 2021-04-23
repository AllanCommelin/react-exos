import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import {useSelector} from "react-redux";
import {getUser} from "../../store/user";

const ArticlePreview = ({ article, displayPopup }) => {
  const history = useHistory();
  const { user } = useSelector(getUser)


  const displayConfirmationPopup = e => {
    e.stopPropagation();
    displayPopup(article.id)
  }

  return (
    <div className="w-1/3 m-6 flex flex-col items-center py-5 h-50 border cursor-pointer" onClick={() => history.push(`/articles/${article.id}`)} >
      <img className="mb-5" src="https://picsum.photos/200/100" alt=""/>
      <p className="text-center">{article.title}</p>
      <p className="text-center">{article.price}</p>
      {Object.entries(user).length > 0 && user.id === article.user && displayPopup && <button onClick={displayConfirmationPopup}>X</button>}
    </div>
  )
}

ArticlePreview.propTypes = {
  displayPopup: PropTypes.func,
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  })
}

ArticlePreview.defaultProps = {
  displayPopup: null
}

export default ArticlePreview;