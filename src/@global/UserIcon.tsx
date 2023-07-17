const UserIcon = (props: any) => {
  // ** Props
  const { icon, iconProps } = props;
  const IconTag = icon;
  // @ts-ignore
  return <IconTag {...iconProps} />;
};

export default UserIcon;
