import Feedback from "../Feedback/Feedback";
import SectionHeading from "../Typography/SectionHeading";

const UserFeedbacks = () => {
  return (
    <div className="container section-space">
      <SectionHeading text={"Feedback"} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 sm:mt-12">
        <Feedback />
        <Feedback />
        <Feedback />
      </div>
    </div>
  );
};

export default UserFeedbacks;
