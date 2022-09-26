import { Box, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type BreadCrumbLink = { path: string; name: string };
export interface IBreadCrumbProps {
  links: BreadCrumbLink[];
  currentName: string;
}
export default function BreadCrumbs(props: IBreadCrumbProps) {
  const { links, currentName } = props;
  return (
    <Box style={{ marginTop: 16, marginBottom: 16 }}>
      <Breadcrumbs aria-label="breadcrumb">
        {links.map((link) => (
          <Link key={link.path} to={link.path}>
            {link.name}
          </Link>
        ))}
        <Typography color="text.primary">{currentName}</Typography>
      </Breadcrumbs>
    </Box>
  );
}
