import React from "react";

import PostHeader from "./PostHeader";
import PostCTA from "./PostCTA";
import PostCaption from "./PostCaption";
import PostComment from "./PostComment";
import PostAddComment from "./PostAddComment";

const HomePost = ({ commentsCount }) => {
  return (
    <div className="home-page__post post-details">
      <PostHeader isHome={true} />

      <div className="post-image">
        <img
          alt="PhotoBy @bayer.tierra6355 on January 22, 2021. ImageMay contain: 8 people, people playing sports, stadium and outdoor."
          className="FFVAD"
          decoding="auto"
          sizes="614px"
          srcSet="
              https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/140603649_198982905265365_7497883318952890933_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=109&amp;_nc_ohc=xouWVLCqNx4AX_GIVQX&amp;tp=1&amp;oh=c9f8907314ae617edb46cf34f0dc831a&amp;oe=60324627  640w,
              https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/140603649_198982905265365_7497883318952890933_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=109&amp;_nc_ohc=xouWVLCqNx4AX_GIVQX&amp;tp=1&amp;oh=0767ed8c6f8f8c9c7f147d832bb4f237&amp;oe=6033BE63  750w,
              https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/140603649_198982905265365_7497883318952890933_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=109&amp;_nc_ohc=xouWVLCqNx4AX_GIVQX&amp;tp=1&amp;oh=cf107f96d7d0093813af5cbac3fbe470&amp;oe=6035D670   1080w
            "
          src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/140603649_198982905265365_7497883318952890933_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=109&amp;_nc_ohc=xouWVLCqNx4AX_GIVQX&amp;tp=1&amp;oh=cf107f96d7d0093813af5cbac3fbe470&amp;oe=6035D670"
          style={{ objectFit: "cover" }}
        />

        {/* <img
            alt="alt text goes brrrr"
            className="FFVAD"
            decoding="auto"
            style="object-fit: cover"
            sizes="614px"
            srcSet="
              https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/140296564_738108167135292_8641333843159977346_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=100&amp;_nc_ohc=uxs9X80492oAX8U82VJ&amp;tp=1&amp;oh=e861d9a57e9547371f45b73926955674&amp;oe=6032A431  640w,
              https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s750x750/140296564_738108167135292_8641333843159977346_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=100&amp;_nc_ohc=uxs9X80492oAX8U82VJ&amp;tp=1&amp;oh=6a27851c1e64879e1f66c60af3af9d05&amp;oe=60354EF5  750w,
              https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/140296564_738108167135292_8641333843159977346_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=100&amp;_nc_ohc=uxs9X80492oAX8U82VJ&amp;tp=1&amp;oh=6b0570c8b7da6afbfd90c709a7d500a7&amp;oe=60329D7A   1080w
            "
            src="https://instagram.fdel11-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/140296564_738108167135292_8641333843159977346_n.jpg?_nc_ht=instagram.fdel11-1.fna.fbcdn.net&amp;_nc_cat=100&amp;_nc_ohc=uxs9X80492oAX8U82VJ&amp;tp=1&amp;oh=6b0570c8b7da6afbfd90c709a7d500a7&amp;oe=60329D7A"
          /> */}

        {/* <img
            src="https://res.cloudinary.com/drwb19czo/image/upload/v1610137464/gc0a5d24g8uv8paa0zn6.jpg"
            alt=""
          />  */}
      </div>

      <div className="post-stats">
        <PostCTA />
        <p className="like-count">140 likes</p>
      </div>

      <div className="post-comments">
        <PostCaption isHome={true} />
        {commentsCount > 2 && (
          <a className="show-more-comments" href="#">
            View all {commentsCount - 2} comments
          </a>
        )}
        <PostComment isHome={true} />
        <p className="date">2 hours ago</p>
      </div>

      <PostAddComment />
    </div>
  );
};

export default HomePost;
