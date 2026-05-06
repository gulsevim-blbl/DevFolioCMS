export type Profile = {
  id: number;
  fullName: string;
  title: string;
  titleTr?: string | null;
  shortBio: string;
  shortBioTr?: string | null;
  about: string;
  aboutTr?: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  cvUrl: string | null;
  imageUrl: string | null;
};
