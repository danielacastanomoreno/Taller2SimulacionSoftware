import { appStatus } from "@/hooks/calculator";
import { CardHeader, CardTitle } from "../ui/card";

const Status = async () => {
  let result = "";

  try {
    result = await appStatus();

    //const {status, uptime, permissions} = result;

    //console.log(permissions); // Validar los permisos aqui

    return (
      <div className="flex flex-col space-y-2">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Health Checks
          </CardTitle>
        </CardHeader>
        {JSON.stringify(result)}
      </div>
    );
  } catch (error) {
    result = "An error ocurred.";
  }

  console.log(result);
};

export default Status;
