import { IdentityGateway } from "@/features/identity";
export class AccountService {
  static async deleteAccount() {
    // Requires admin level or edge function typically, but mocked for presentation.
    return { success: false, message: "Deletion requires Edge Function" };
  }
}
