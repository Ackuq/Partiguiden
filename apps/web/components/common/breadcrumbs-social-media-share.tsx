import type { BreadcrumbsProps } from "./breadcrumbs";
import Breadcrumbs from "./breadcrumbs";
import type { SocialMediaShareProps } from "./social-media-share";
import SocialMediaShare from "./social-media-share";

type BreadcrumbsSocialMediaShareProps = {
  breadcrumbsProps: BreadcrumbsProps;
  socialMediaProps: SocialMediaShareProps;
};

export default function BreadcrumbsSocialMediaShare({
  breadcrumbsProps,
  socialMediaProps,
}: BreadcrumbsSocialMediaShareProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <Breadcrumbs {...breadcrumbsProps} />
      <SocialMediaShare {...socialMediaProps} />
    </div>
  );
}
