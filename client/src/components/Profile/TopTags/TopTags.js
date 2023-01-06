import { Link } from "react-router-dom";
import "./TopTags-style.css";
import TopTagsBody from "../TopTagsBody/TopTagsBody";

export default function TopTags(pros) {
  return (
    <>
      <div className="profile-top-tags">
        <div className="profile-top-tags-header">
          <h2> Top Tags</h2>
          <Link to="#" style={{ textDecoration: "none", color: "grey" }}>
            View all tags{" "}
          </Link>
        </div>
        <div className="profile-top-tags-container">
          <TopTagsBody tagName='Python' tagScore={3413} tagPercent={80} tagTotalPosts={5341}/>
          <TopTagsBody tagName='pandas' tagScore={6997} tagPercent={74} tagTotalPosts={6065}/>
          <TopTagsBody tagName='dataframe' tagScore={3269} tagPercent={35} tagTotalPosts={2845}/>
          <TopTagsBody tagName='numpy' tagScore={1247} tagPercent={12} tagTotalPosts={1000}/>
          <TopTagsBody tagName='python-3.xx' tagScore={830} tagPercent={9} tagTotalPosts={728}/>
          <TopTagsBody tagName='list' tagScore={679} tagPercent={7} tagTotalPosts={534} lastOne={true}/>



        </div>
      </div>
    </>
  );
}
