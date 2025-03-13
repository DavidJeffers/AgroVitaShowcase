import { useState } from "react";
import { ActionFunctionArgs, redirect } from "react-router";
import { Form, useActionData } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const password = formData.get("password") as string;

  const supabase = createSupabaseServerClient(request);
  console.log(password);

  try {
    const { data, error } = await supabase.client.auth.updateUser({
      password: password,
    });
    console.log(data);
    console.log(error);

    if (error) throw error;

    return redirect("/sign-in");
  } catch (error) {
    return {
      error: "Failed to update password. Please try again.",
      errorMsg: error,
    };
  }
};

export default function ResetPassword() {
  const actionData = useActionData<typeof action>();
  const [password, setPassword] = useState("");
  const [error] = useState<string | null>(null);

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Reset Your Password
        </Typography>

        <Form method="post">
          <TextField
            label="New Password"
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            name="password"
            fullWidth
            required
            margin="normal"
            sx={{ mb: 2 }}
          />

          {(error || actionData?.error) && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error || actionData?.error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              bgcolor: "#007bff",
              py: 1.5,
              borderRadius: 3,
              "&:hover": {
                bgcolor: "#0056b3",
              },
            }}
          >
            Update Password
          </Button>
        </Form>
      </Paper>
    </Box>
  );
}
