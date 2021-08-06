import React, { useEffect } from "react";
import { getDataFromApi, wsConnectionStart } from "../../services/slices";
import { FeedIngredients, FeedNumbersTablet, Loader } from "../../components/";
import { LoadStatuses } from "../../enums";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Feed: React.FC = () => {
  const dispatch = useAppDispatch();

  const { data, dataLoading } = useAppSelector((state) => state.data);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDataFromApi());
    }

    dispatch(wsConnectionStart());
    //eslint-disable-next-line
  }, []);

  if (dataLoading === LoadStatuses.Pending) return <Loader />;

  return (
    <>
      <FeedIngredients />
      <FeedNumbersTablet />
    </>
  );
};

export default Feed;
