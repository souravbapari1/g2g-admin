"use client";
import React, { useCallback, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MicroActionItem } from "./md";
import { useMicroActionState } from "./microActioonState";

function MicroActionsList({ data }: { data?: MicroActionItem[] }) {
  const maState = useMicroActionState();
  const maList = useCallback(() => {
    return data?.filter((e) => e.id != maState.selected?.id);
  }, [data, maState.selected]);

  useEffect(() => {
    const select = data?.find((e) => e.isPrimary == true);
    if (select) {
      maState.setSelected(select);
    }
  }, []);

  if (maList()?.length == 0) {
    return null;
  }

  return (
    <Carousel className=" w-[87%] mx-auto mt-10">
      <CarouselContent>
        {maList()?.map((e, index) => (
          <CarouselItem
            className="lg:basis-1/3 md:basis-1/2 basis-full"
            key={e.id + index}
          >
            <Card className="shadow-none overflow-hidden border-2 border-white text-center bg-primary/5">
              <CardHeader>
                <CardTitle className="text-xl">{e.title}</CardTitle>
                <p>
                  <span className="font-bold">{e.kgPerUnit} </span> Kg Per Unit
                </p>
              </CardHeader>
              <CardFooter
                onClick={() => maState.setSelected(e)}
                className="bg-primary select-none cursor-pointer text-center flex justify-center items-center p-0 h-10 text-white text-xs"
              >
                <p>View Impacts</p>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default MicroActionsList;
