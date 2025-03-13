import { Container, Typography, Box, List, ListItem } from "@mui/material";

export default function TermsOfService() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Main Title and Update Date */}
      <Typography component="h1" gutterBottom variant="h4">
        Terms of Service for AgroVita
      </Typography>
      <Typography gutterBottom variant="subtitle2">
        Last updated: February 03, 2025
      </Typography>

      {/* 1. Agreement to Terms */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          1. Agreement to Terms
        </Typography>
        <Typography gutterBottom variant="body1">
          By accessing and using AgroVita (agrovita.org) and its services
          (collectively, the &quot;Service&quot;), you agree to be bound by
          these Terms of Service (&quot;Terms&quot;). If you disagree with any
          part of these terms, you may not access the Service.
        </Typography>
      </Box>

      {/* 2. Description of Service */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          2. Description of Service
        </Typography>
        <Typography gutterBottom variant="body1">
          AgroVita is a platform that:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Connects consumers with sustainable and regenerative farms
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Provides educational resources about regenerative agriculture
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Facilitates communication between farmers and consumers
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Allows users to discover and follow farms
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Enables sharing of agricultural practices and knowledge
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 3. User Accounts */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          3. User Accounts
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          3.1 Account Creation
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You must be 13 years or older to create an account
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You must provide accurate and complete information
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You are responsible for maintaining account security
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You must notify us of any unauthorized account use
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          3.2 Account Termination
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Suspend or terminate accounts
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• Remove or edit content</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• Deny service to anyone</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Delete accounts that remain inactive for extended periods
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 4. User Responsibilities */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          4. User Responsibilities
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          4.1 Content Guidelines
        </Typography>
        <Typography gutterBottom variant="body1">
          You agree not to post content that:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Is false, misleading, or deceptive
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Infringes on intellectual property rights
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Contains malware or harmful code
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Violates any applicable laws
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Harasses or discriminates against others
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Promotes illegal activities
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          4.2 Farm Verification
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Farms may apply for verification status
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Verification requires proof of agricultural practices
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • False claims about certification may result in account
              termination
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We reserve the right to revoke verification status
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 5. Intellectual Property Rights */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          5. Intellectual Property Rights
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          5.1 Our Content
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We retain all rights to the Service&apos;s design, code, and
              content
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Our trademarks and branding may not be used without permission
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • The Service&apos;s features and functionality are protected by
              copyright
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          5.2 User Content
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You retain rights to content you post
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You grant us license to use, display, and distribute your
              content
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We may promote your content across our platform
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 6. Payment Terms */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          6. Payment Terms
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          6.1 Pricing
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Some features may require payment
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Prices are subject to change with notice
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Refunds are handled case-by-case
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • All fees are in USD unless specified
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          6.2 Payment Processing
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We use secure third-party payment processors
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You must provide accurate billing information
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Recurring charges will be clearly disclosed
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Failed payments may result in service interruption
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 7. Prohibited Activities */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          7. Prohibited Activities
        </Typography>
        <Typography gutterBottom variant="body1">
          Users may not:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Attempt to access restricted areas of the Service
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Use automated systems without permission
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Interfere with Service operation
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Create multiple accounts for deceptive purposes
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Resell or sublicense the Service
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Collect user information without consent
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 8. Disclaimers */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          8. Disclaimers
        </Typography>

        <Typography gutterBottom variant="subtitle1">
          8.1 Service Availability
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Service provided &quot;as is&quot; and &quot;as available&quot;
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • No guarantee of uninterrupted service
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We may modify or discontinue features
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We are not responsible for third-party content
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          8.2 Farm Information
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We do not verify all farm claims
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Users should independently verify certifications
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We are not responsible for farm-consumer disputes
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Agricultural results may vary
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 9. Limitation of Liability */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          9. Limitation of Liability
        </Typography>
        <Typography gutterBottom variant="body1">
          We are not liable for:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Indirect or consequential damages
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• Lost profits or data</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• Service interruptions</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• User content or conduct</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Third-party links and services
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 10. Indemnification */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          10. Indemnification
        </Typography>
        <Typography gutterBottom variant="body1">
          You agree to indemnify and hold harmless AgroVita from claims
          resulting from:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">• Your use of the Service</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• Your content</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Your violation of these Terms
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Your violation of others&apos; rights
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 11. Changes to Terms */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          11. Changes to Terms
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • We may modify these Terms at any time
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Changes will be effective upon posting
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Continued use constitutes acceptance
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Material changes will be announced
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 12. Dispute Resolution */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          12. Dispute Resolution
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          12.1 Governing Law
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • These Terms are governed by IL/USA law
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Disputes will be resolved in IL
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • You waive right to class action
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          12.2 Arbitration
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Disputes will be resolved by binding arbitration
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Arbitration will be conducted in [Your Location]
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Each party bears its own costs
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 13. General Provisions */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          13. General Provisions
        </Typography>
        <Typography gutterBottom variant="subtitle1">
          13.1 Entire Agreement
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • These Terms constitute the entire agreement
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • They supersede prior agreements
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • No waiver of any term implies future waivers
            </Typography>
          </ListItem>
        </List>

        <Typography gutterBottom sx={{ mt: 2 }} variant="subtitle1">
          13.2 Severability
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Invalid provisions will be modified to be valid
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Remaining provisions stay in effect
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Terms will be interpreted to maximum effect
            </Typography>
          </ListItem>
        </List>
      </Box>

      {/* 14. Contact Information */}
      <Box sx={{ mt: 4 }}>
        <Typography component="h2" gutterBottom variant="h6">
          14. Contact Information
        </Typography>
        <Typography gutterBottom variant="body1">
          For questions about these Terms:
        </Typography>
        <List sx={{ pl: 2 }}>
          <ListItem disableGutters>
            <Typography variant="body1">• Email: david@agrovita.org</Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">
              • Address: 17 Somerset Montgomery IL 60538
            </Typography>
          </ListItem>
          <ListItem disableGutters>
            <Typography variant="body1">• Phone: 3312557102</Typography>
          </ListItem>
        </List>
      </Box>

      {/* Final Acknowledgment */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="body1">
          By using AgroVita, you acknowledge that you have read, understood, and
          agree to be bound by these Terms of Service.
        </Typography>
      </Box>
    </Container>
  );
}
