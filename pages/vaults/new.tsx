import ProtectedRoute from "@/components/ProtectedRoute";
import { NextPageWithLayout } from "../_app";

const newVaultPage: NextPageWithLayout = () => {
  return (
    <div>
      <h1>New Vault Creation</h1>
    </div>
  );
};

newVaultPage.getLayout = (page) => {
  return <ProtectedRoute>{page}</ProtectedRoute>;
};

export default newVaultPage;
