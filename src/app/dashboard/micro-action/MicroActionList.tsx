"use client";

import { useEffect, useState } from "react";
import { getMicroActions, MicroActionDataItem } from "./actions";
import { Collection } from "@/interfaces/collection";
import MicroActionItem from "./MicroActionItem";

function MicroActionList() {
  const [data, setData] = useState<Collection<MicroActionDataItem>>();
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getMicroActions();
      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      {data?.items.map((item) => (
        <MicroActionItem
          key={item.id}
          data={item}
          onDelete={(e) => {
            if (data) {
              setData({
                ...data,
                items: data?.items.filter((i) => i.id !== e.id),
              });
            }
          }}
        />
      ))}
    </div>
  );
}

export default MicroActionList;
