import Button from "../libs/Button";

function NextAndPrevButton({
  setSteper,
  disabledNext,
  disabledPrev,
  handleSubmit,
  hiddenNext,
  submitBtnText,
  isLoading,
  handlePrevStep,
}) {
  return (
    <div className=" flex justify-between lg:justify-end items-end gap-5">
      <Button
        type="button"
        disabled={disabledPrev}
        variant="contain"
        onClick={() => {
          if (handlePrevStep) {
            handlePrevStep();
          } else {
            setSteper((prev) => prev - 1);
          }
        }}
      >
        Previous
      </Button>

      {!hiddenNext && (
        <Button
          type="button"
          disabled={disabledNext}
          variant="contain"
          className="px-7 md:px-8 lg:!px-9"
          onClick={() => setSteper((prev) => prev + 1)}
        >
          Next
        </Button>
      )}

      {handleSubmit && (
        <Button
          loading={isLoading}
          type="submit"
          className="px-7 md:px-8 lg:!px-9"
          variant="contain"
        >
          {submitBtnText || "Submit"}
        </Button>
      )}
    </div>
  );
}

export default NextAndPrevButton;
