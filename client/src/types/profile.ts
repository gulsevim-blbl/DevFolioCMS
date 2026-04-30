export type Profile = {
  id: number;
  fullName: string;
  title: string;
  shortBio: string;
  about: string;
  email: string;
  phone: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
  imageUrl: string | null;
};