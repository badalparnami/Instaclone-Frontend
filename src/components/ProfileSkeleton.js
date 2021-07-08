import React from "react";
import Skeleton from "react-loading-skeleton";

const placeholderArr = [0, 1, 2];

const ProfileSkeleton = () => {
  return (
    <main className="profile-page">
      <div className="profile-header">
        <Skeleton
          circle={true}
          height={150}
          width={150}
          style={{ marginRight: 100 }}
        />
        <div className="profile-header__details">
          <div className="profile-1">
            <Skeleton width={275} height={30} />
          </div>
          <div className="profile-2">
            <Skeleton width={275} height={30} />
          </div>
          <div className="profile-3">
            <Skeleton width={275} height={60} />
          </div>
        </div>
      </div>
      <div className="profile-categories" style={{ margin: 10 }}>
        {placeholderArr.map((a) => (
          <Skeleton key={a} width={100} />
        ))}
      </div>
      <div className="profile-images">
        {placeholderArr.map((a) => (
          <Skeleton key={a} height={250} />
        ))}
      </div>
    </main>
  );
};

export default ProfileSkeleton;
