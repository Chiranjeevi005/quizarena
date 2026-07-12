import { IdentityGateway } from "@/features/identity";
export class UserProfileService {
  static async updateProfile(data: any) {
    // Using Auth update for user_metadata
    return IdentityGateway.getAuth().updateUser({ data });
  }
}
