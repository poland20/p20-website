import { CloudinaryPhoto } from "./Cloudinary";
import SponsorCategory from "./SponsorCategory";

type Sponsor = {
    name: string;
    logo: CloudinaryPhoto;
    description: string;
    url: string;
    showInPrevious: boolean;
    category: string;
};

export default Sponsor;