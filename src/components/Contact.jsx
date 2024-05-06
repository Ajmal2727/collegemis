import React from "react";
import { Grid, Card, CardContent, Typography, Link } from "@mui/material";
import { motion } from "framer-motion";
import Avatar from 'react-bootstrap/Avatar';


const ContactPage = () => {
  const contacts = [
    { name: "Ajmal Shaikh", role: "Developer", email: "ajmal@example.com", avatar: "https://example.com/ajmal_avatar.jpg" },
    { name: "Umar Shaikh", role: "Developer", email: "umar@example.com", avatar: "https://example.com/umar_avatar.jpg" },
    { name: "Vishwas Singh", role: "Tester", email: "vishwas@example.com", avatar: "https://example.com/vishwas_avatar.jpg" },
    { name: "Ajmal Shaikh", role: "Project Lead", email: "ajmal_lead@example.com", avatar: "https://example.com/ajmal_lead_avatar.jpg" },
  ];

  return (
    <div className="container mx-auto py-4">
      <Grid container spacing={3}>
        {contacts.map((contact, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <ContactCard contact={contact} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const ContactCard = ({ contact }) => {
  const { name, role, email, avatar } = contact;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card elevation={3} className="h-100">
        <CardContent className="d-flex flex-column align-items-center justify-content-center">
          <Avatar alt={name} src={avatar} className="mb-2" style={{ width: '100px', height: '100px' }} />
          <Typography variant="h6" className="text-center mb-2">{name}</Typography>
          <Typography variant="body2" color="textSecondary" className="text-center mb-2">
            {role}
          </Typography>
          <Link href={`mailto:${email}`} color="primary" underline="hover" className="text-center">
            {email}
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ContactPage;
