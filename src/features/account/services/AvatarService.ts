import { IdentityGateway } from "@/features/identity";
// Note: Since Supabase Storage client requires the full client, we might need it from IdentityGateway
// For now, assume a static bucket upload abstraction.
export class AvatarService {
  static getStoragePath(userId: string) {
    return `avatars/${userId}/avatar.webp`;
  }
}
