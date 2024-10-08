import PropTypes from "prop-types";

const FeedTitle = ({ title, thumbnail }) => {
  console.log("FeedTitle Props - Title:", title);
  console.log("FeedTitle Props - Thumbnail:", thumbnail);

  return (
    <div className="w-[342px] flex flex-col justify-center items-center">
      <div className="items-centerself-stretch my-[14px] text-3xl font-bold ">
        {title}
      </div>
      <div className="flex justify-center items-center w-[390px]">
        <img src={thumbnail} alt="Thumbnail" className="w-[390px] h-auto" />
      </div>
    </div>
  );
};

FeedTitle.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default FeedTitle;
