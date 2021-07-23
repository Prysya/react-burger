import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataFromApi } from "../../services/slices";
import { FeedIngredients, FeedNumbersTablet, Loader } from "../../components/";
import { wsConnectionStart } from "../../services/slices";
import { LOAD_STATUSES } from "../../constants";

const Feed = () => {
  const dispatch = useDispatch();

  const { data, dataLoading } = useSelector((state) => state.data);

  useEffect(() => {
    if (data.length === 0) {
      dispatch(getDataFromApi());
    }

    dispatch(wsConnectionStart());
    //eslint-disable-next-line
  }, []);

  if (dataLoading === LOAD_STATUSES.PENDING) return <Loader />;

  return (
    <>
      <FeedIngredients />
      <FeedNumbersTablet />
    </>
  );
};

export default Feed;
