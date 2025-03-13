import { Box, Typography } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Box sx={{ padding: 3, maxWidth: "800px", margin: "0 auto" }}>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Privacy Policy for AgroVita
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Last updated: February 03, 2025
      </Typography>

      {/* 1. Introduction */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        1. Introduction
      </Typography>
      <Typography variant="body2" gutterBottom>
        Welcome to AgroVita (&quot;we,&quot; &quot;our,&quot; or
        &quot;us&quot;). This Privacy Policy explains how we collect, use,
        disclose, and safeguard your information when you use our website
        (agrovita.org) and services, including our web application and related
        features (collectively, the &quot;Service&quot;).
      </Typography>

      {/* 2. Information We Collect */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        2. Information We Collect
      </Typography>

      {/* 2.1 Information You Provide to Us */}
      <Typography variant="subtitle2" gutterBottom>
        2.1 Information You Provide to Us
      </Typography>
      <Typography variant="body2" gutterBottom>
        We collect information that you voluntarily provide when using our
        Service, including:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Account information (name, email address, username)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Profile information (profile picture, profile description)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Farm-related information (farm details, location, certifications)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Content you post (comments, likes, favorites)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Communications with us (feedback, support inquiries)
          </Typography>
        </li>
      </Box>

      {/* 2.2 Information Automatically Collected */}
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
        2.2 Information Automatically Collected
      </Typography>
      <Typography variant="body2" gutterBottom>
        When you use our Service, we automatically collect:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Log data (IP address, browser type, pages visited)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Device information (operating system, unique device identifiers)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Location data (if permitted by your device)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Usage data (interactions with our Service)
          </Typography>
        </li>
      </Box>

      {/* 2.3 Information from Third Parties */}
      <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
        2.3 Information from Third Parties
      </Typography>
      <Typography variant="body2" gutterBottom>
        We may receive information about you from third parties, including:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Google OAuth authentication data
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Other social media platforms you choose to connect
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Public databases and agricultural certification bodies
          </Typography>
        </li>
      </Box>

      {/* 3. How We Use Your Information */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        3. How We Use Your Information
      </Typography>
      <Typography variant="body2" gutterBottom>
        We use the collected information for:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Providing and maintaining our Service
          </Typography>
        </li>
        <li>
          <Typography variant="body2">Processing your transactions</Typography>
        </li>
        <li>
          <Typography variant="body2">
            Communicating with you about our Service
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Improving and personalizing user experience
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Analyzing usage patterns and trends
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Protecting against unauthorized access
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Complying with legal obligations
          </Typography>
        </li>
      </Box>

      {/* 4. Google OAuth Specific Terms */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        4. Google OAuth Specific Terms
      </Typography>
      <Typography variant="body2" gutterBottom>
        When you choose to sign in using Google OAuth, we:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Access your Google account email address for authentication
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Receive basic profile information (name, profile picture)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Do not access your Google contacts or other Google services
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Never post to Google on your behalf
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Store only necessary authentication tokens securely
          </Typography>
        </li>
      </Box>
      <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
        We comply with Google&apos;s OAuth 2.0 policies and:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Never transfer these credentials to others
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Handle all data securely using industry standards
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Allow you to revoke access at any time
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Only request minimum necessary permissions
          </Typography>
        </li>
      </Box>

      {/* 5. Information Sharing and Disclosure */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        5. Information Sharing and Disclosure
      </Typography>
      <Typography variant="body2" gutterBottom>
        We may share your information with:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Service providers (hosting, analytics, payment processing)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Legal authorities when required by law
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Other users (according to your privacy settings)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Business partners (with your consent)
          </Typography>
        </li>
      </Box>
      <Typography variant="body2" gutterBottom>
        We do not sell your personal information to third parties.
      </Typography>

      {/* 6. Data Security */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        6. Data Security
      </Typography>
      <Typography variant="body2" gutterBottom>
        We implement appropriate security measures to protect your information,
        including:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Encryption of data in transit and at rest
          </Typography>
        </li>
        <li>
          <Typography variant="body2">Regular security assessments</Typography>
        </li>
        <li>
          <Typography variant="body2">
            Access controls and authentication
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Secure data storage using Supabase
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Regular backups and monitoring
          </Typography>
        </li>
      </Box>

      {/* 7. Your Rights and Choices */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        7. Your Rights and Choices
      </Typography>
      <Typography variant="body2" gutterBottom>
        You have the right to:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            Access your personal information
          </Typography>
        </li>
        <li>
          <Typography variant="body2">Correct inaccurate data</Typography>
        </li>
        <li>
          <Typography variant="body2">Request deletion of your data</Typography>
        </li>
        <li>
          <Typography variant="body2">
            Opt-out of marketing communications
          </Typography>
        </li>
        <li>
          <Typography variant="body2">Adjust privacy settings</Typography>
        </li>
        <li>
          <Typography variant="body2">Revoke Google OAuth access</Typography>
        </li>
      </Box>

      {/* 8. Children's Privacy */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        8. Children&apos;s Privacy
      </Typography>
      <Typography variant="body2" gutterBottom>
        Our Service is not intended for children under 13. We do not knowingly
        collect information from children under 13.
      </Typography>

      {/* 9. International Data Transfers */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        9. International Data Transfers
      </Typography>
      <Typography variant="body2" gutterBottom>
        Your information may be transferred and processed in countries other
        than your own. We ensure appropriate safeguards are in place for such
        transfers.
      </Typography>

      {/* 10. Changes to This Privacy Policy */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        10. Changes to This Privacy Policy
      </Typography>
      <Typography variant="body2" gutterBottom>
        We may update this Privacy Policy periodically. We will notify you of
        any material changes by posting the new Privacy Policy on this page and
        updating the &quot;Last updated&quot; date.
      </Typography>

      {/* 11. Contact Us */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        11. Contact Us
      </Typography>
      <Typography variant="body2" gutterBottom>
        If you have questions about this Privacy Policy, please contact us at:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">Email: david@agrovita.org</Typography>
        </li>
        <li>
          <Typography variant="body2">
            Address: 17 Somerset Montgomery, IL 60538
          </Typography>
        </li>
      </Box>

      {/* 12. California Privacy Rights */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        12. California Privacy Rights
      </Typography>
      <Typography variant="body2" gutterBottom>
        California residents have additional rights under the CCPA (California
        Consumer Privacy Act). Please contact us for more information about
        exercising these rights.
      </Typography>

      {/* 13. Cookie Policy */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        13. Cookie Policy
      </Typography>
      <Typography variant="body2" gutterBottom>
        We use cookies solely for authentication and session management on our
        Service. These cookies are essential for keeping you logged in and
        maintaining secure sessions. We do not use cookies for analytics,
        marketing, or other tracking purposes. You can disable cookies in your
        browser settings; however, doing so may prevent you from using some or
        all of the features of our Service, since our authentication relies on
        these cookies to function properly.
      </Typography>

      {/* 14. Compliance */}
      <Typography variant="h6" component="h2" sx={{ mt: 3 }} gutterBottom>
        14. Compliance
      </Typography>
      <Typography variant="body2" gutterBottom>
        We comply with applicable data protection laws, including:
      </Typography>
      <Box component="ul" sx={{ pl: 4 }}>
        <li>
          <Typography variant="body2">
            CCPA (California Consumer Privacy Act)
          </Typography>
        </li>
        <li>
          <Typography variant="body2">
            Other applicable state and federal laws
          </Typography>
        </li>
      </Box>

      {/* Footer Notice */}
      <Typography variant="body2" sx={{ mt: 3 }}>
        --- By using our Service, you agree to this Privacy Policy. If you
        disagree with any part of this policy, please discontinue use of our
        Service.
      </Typography>
    </Box>
  );
}
