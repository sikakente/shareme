import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";

import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import MasonryLayout from "./MasonryLayout";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState();
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);

      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  const ideaName = categoryId || "new";

  if (loading) {
    return <Spinner message={`We are adding ${ideaName} to your feed!`} />;
  }
  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
