import { appStatus } from "@/hooks/calculator";

const Status = async () => {
  let result = "";

  try {
    result = await appStatus();

    return (
      <div className="flex flex-col space-y-2">
        <h1>{result}</h1>
      </div>
    );
  } catch (error) {
    result = "An error ocurred.";
  }

  console.log(result);
};

export default Status;
