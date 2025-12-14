import Button from "@/components/libs/Button";
import Card from "@/components/libs/Card";
import OutlinedInput from "@/components/libs/OutlinedInput";
import Typography from "@/components/libs/Typography";
import { config } from "@/config";
import { Advertisementschema } from "@/schema/Advertisement";
import { useGetAdCostsQuery } from "@/store/features/advertisement";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import Image from "next/image";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaAd } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { IoTextOutline } from "react-icons/io5";
import { RiCameraLensFill } from "react-icons/ri";
import DropdownMenus from "../libs/DropdownMenus";

function AdvertisementForm({ data, onSubmit, isLoading, title, isNew }) {
  const { data: costs, isLoading: costLoading } = useGetAdCostsQuery();
  const bannerImageRef = useRef(null);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(Advertisementschema),
    defaultValues: {
      title: data.title || "",
      target_url: data.target_url || "",
      banner_image: data.banner_image || null,
      cost_id: parseInt(data.abs_cost_id || "0") || null,
      status: data.status || "PENDING",
    },
  });

  const bannerImage = watch("banner_image");
  const costId = watch("cost_id");

  const imageUrl =
    bannerImage && typeof bannerImage === "object"
      ? URL.createObjectURL(bannerImage)
      : typeof bannerImage === "string"
      ? config.fileBaseUrl + bannerImage
      : null;

  const Component = isNew ? Card : "div";
  const statusOptions = [
    {
      label: "Active",
      value: "ACTIVE",
    },
    {
      label: "Inactive",
      value: "INACTIVE",
    },
  ];

  return (
    <Component>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {title && (
          <Typography variant="h4" color="primary">
            {title}
          </Typography>
        )}

        <OutlinedInput
          label="Ads title"
          type="text"
          placeholder="Ads Title"
          {...register("title", { required: true })}
          startIcon={<IoTextOutline />}
          error={errors.title?.message}
        />

        <OutlinedInput
          label="Target Destination"
          type="url"
          placeholder="https://demo.com/"
          {...register("target_url", { required: true })}
          startIcon={<IoIosLink />}
          error={errors.target_url?.message}
        />

        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            {costLoading ? (
              <>
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-10 bg-border rounded-md animate-pulse w-full min-md:w-[33.33%] grow"
                  />
                ))}
              </>
            ) : (
              costs?.ad_cost_lists?.map((costItem) => (
                <Button
                  type="button"
                  key={costItem.id}
                  className="!border-border w-full min-md:w-[33.33%] grow !justify-between"
                  variant={costId === costItem.id ? "contain" : "outline"}
                  onClick={() =>
                    setValue("cost_id", costItem.id, {
                      shouldValidate: true,
                    })
                  }
                >
                  <div className="flex items-center gap-2">
                    <FaAd className="dark:text-gray-300" />
                    <Typography variant="body2">
                      {costItem.duration_days}
                    </Typography>
                  </div>
                  <Typography variant="body2">${costItem.cost}</Typography>
                </Button>
              ))
            )}
          </div>
          {errors.cost_id && (
            <Typography variant="error">{errors.cost_id.message}</Typography>
          )}
        </div>

        {!isNew && (
          <div>
            <Typography variant="body2">Status</Typography>
            <Controller
              name="status"
              control={control}
              render={({ field }) => {
                return (
                  <DropdownMenus
                    placeholder="Select Status"
                    selected={
                      field.value === "APPROVED" ? "ACTIVE" : "INACTIVE"
                    }
                    setSelected={field.onChange}
                    options={statusOptions}
                  />
                );
              }}
            />
          </div>
        )}

        <div>
          <Typography variant="body2">
            *image resolution max-width (1000px) & max-height (500px) (allow
            only .jpg .png)
          </Typography>

          <Controller
            name="banner_image"
            control={control}
            render={({ field }) => (
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    if (bannerImageRef.current) {
                      bannerImageRef.current.click();
                    }
                  }}
                  variant="outline"
                  className={clsx({
                    "!border-error !text-error": errors.banner_image,
                    "!border-border": !errors.banner_image,
                  })}
                >
                  <RiCameraLensFill className="text-xl" /> Select banner image
                </Button>
                {errors.banner_image && (
                  <Typography variant="error">
                    {errors.banner_image.message}
                  </Typography>
                )}
                <input
                  ref={bannerImageRef}
                  type="file"
                  id="card-front"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    e.target.files && field.onChange(e.target.files[0])
                  }
                />
                {imageUrl && (
                  <Image
                    height={200}
                    width={400}
                    src={imageUrl}
                    alt="Front Preview"
                    className="mt-2 rounded-md"
                  />
                )}
              </div>
            )}
          />
        </div>
        <Button loading={isLoading} variant="contain">
          Submit
        </Button>
      </form>
    </Component>
  );
}

export default AdvertisementForm;
