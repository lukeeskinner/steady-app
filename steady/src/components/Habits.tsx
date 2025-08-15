import {
  Card,
  Box,
  Flex,
  Text,
  Badge,
  Button,
  Dialog,
  TextField,
  Select,
} from "@radix-ui/themes";
import { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import type { Habit } from "./Habit";

function Habits() {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Morning Workout",
      description: "30 minutes of exercise",
      category: "health",
      frequency: "daily",
      total: 15,
      streak: 5,
      highestStreak: 12,
      color: "blue",
      icon: "💪",
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Read Books",
      description: "Read for 20 minutes daily",
      category: "productivity",
      frequency: "daily",
      total: 23,
      streak: 3,
      highestStreak: 8,
      color: "green",
      icon: "📚",
      isActive: true,
      createdAt: new Date(),
    },
  ]);

  // --- Add Habit dialog state ---
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "health",
    frequency: "daily",
    color: "blue",
    icon: "✅",
  });
  const [errors, setErrors] = useState<{ name?: string }>({});

  const colorOptions = [
    "blue",
    "green",
    "red",
    "yellow",
    "violet",
    "indigo",
    "orange",
  ] as const;
  const categoryOptions = [
    "health",
    "productivity",
    "learning",
    "finance",
    "social",
  ] as const;
  const frequencyOptions = ["daily", "weekly", "custom"] as const;

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      category: "health",
      frequency: "daily",
      color: "blue",
      icon: "✅",
    });
    setErrors({});
  };

  const handleCreate = (e?: React.FormEvent) => {
    e?.preventDefault();

    // minimal validation
    const nextErrors: typeof errors = {};
    if (!form.name.trim()) nextErrors.name = "Name is required";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newHabit: Habit = {
      id: (crypto?.randomUUID?.() ?? Date.now().toString()) as string,
      name: form.name.trim(),
      description: form.description.trim(),
      category: form.category as Habit["category"],
      frequency: form.frequency as Habit["frequency"],
      total: 0,
      streak: 0,
      highestStreak: 0,
      color: form.color as Habit["color"],
      icon: form.icon,
      isActive: true,
      createdAt: new Date(),
    };

    setHabits((prev) => [newHabit, ...prev]);
    setOpen(false);
    resetForm();
  };

  return (
    <div
      className="habits-container"
      style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}
    >
      <div className="habits-header" style={{ marginBottom: "2rem" }}>
        <Text as="h1" size="6" weight="bold" style={{ margin: "0 0 0.5rem 0" }}>
          Your Habits
        </Text>
        <Text as="p" size="3" color="gray" style={{ margin: 0 }}>
          Track your daily progress and build consistent routines
        </Text>
      </div>

      <Flex direction="column" gap="3">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            size="3"
            variant="surface"
            style={{ padding: "1.5rem" }}
          >
            <Flex justify="between" align="start" gap="4">
              {/* Left side - Habit info */}
              <Flex direction="column" gap="2" style={{ flex: 1 }}>
                <Flex align="center" gap="2">
                  {habit.icon && <Text size="4">{habit.icon}</Text>}
                  <Text as="div" size="4" weight="bold">
                    {habit.name}
                  </Text>
                  <Badge color={habit.color as any} variant="soft" size="1">
                    {habit.category}
                  </Badge>
                </Flex>

                {habit.description && (
                  <Text
                    as="div"
                    size="2"
                    color="gray"
                    style={{ marginBottom: "0.5rem" }}
                  >
                    {habit.description}
                  </Text>
                )}

                <Flex gap="4" align="center">
                  <Flex align="center" gap="1">
                    <Text size="2">🔥</Text>
                    <Text size="2" weight="medium">
                      {habit.streak}
                    </Text>
                    <Text size="1" color="gray">
                      day streak
                    </Text>
                  </Flex>

                  <Flex align="center" gap="1">
                    <Text size="2">📊</Text>
                    <Text size="2" weight="medium">
                      {habit.total}
                    </Text>
                    <Text size="1" color="gray">
                      total
                    </Text>
                  </Flex>

                  <Flex align="center" gap="1">
                    <Text size="2">🏆</Text>
                    <Text size="2" weight="medium">
                      {habit.highestStreak}
                    </Text>
                    <Text size="1" color="gray">
                      best
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Card>
        ))}

        {/* Add New Habit trigger */}
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger>
            <Card
              size="3"
              variant="ghost"
              style={{
                border: "2px dashed var(--gray-6)",
                padding: "2rem",
                marginTop: "10px",
                cursor: "pointer",
                transition: "border-color 0.2s ease",
              }}
            >
              <Flex justify="center" align="center" direction="column" gap="2">
                <Box
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "var(--gray-3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PlusIcon width="20" height="20" color="var(--gray-9)" />
                </Box>
                <Text size="3" weight="medium" color="gray">
                  Add New Habit
                </Text>
                <Text size="2" color="gray">
                  Start building a new routine
                </Text>
              </Flex>
            </Card>
          </Dialog.Trigger>

          {/* Dialog Content */}
          <Dialog.Content maxWidth="520px">
            <Dialog.Title>Add a new habit</Dialog.Title>
            <Dialog.Description size="2" color="gray">
              Give it a name and choose how often you’ll do it.
            </Dialog.Description>

            <form onSubmit={handleCreate}>
              <Flex direction="column" gap="4" mt="4">
                <Box>
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="medium">
                      Name *
                    </Text>
                    <TextField.Root
                      placeholder="e.g., Drink Water"
                      value={form.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                    />
                    {errors.name && (
                      <Text size="1" color="red">
                        {errors.name}
                      </Text>
                    )}
                  </Flex>
                </Box>
                </Flex>

                <Box>
                  <Flex direction="column" gap="2">
                    <Text size="2" weight="medium">
                      Description
                    </Text>
                    <TextField.Root
                      placeholder="Optional note"
                    value={form.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                  />
                  </Flex>
                </Box>

                <Flex gap="3" wrap="wrap">
                  <Box style={{ minWidth: 180 }}>
                    <Flex direction="column" gap="2">
                      <Text size="2" weight="medium">
                        Category
                      </Text>
                      <Select.Root
                        value={form.category}
                      onValueChange={(v: string) =>
                        setForm((f) => ({ ...f, category: v }))
                      }
                    >
                      <Select.Trigger />
                      <Select.Content>
                        {categoryOptions.map((c: string) => (
                          <Select.Item key={c} value={c}>
                            {c}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                    </Flex>
                  </Box>

                  <Box style={{ minWidth: 180 }}>
                    <Flex direction="column" gap="2">
                      <Text size="2" weight="medium">
                        Frequency
                      </Text>
                      <Select.Root
                        value={form.frequency}
                      onValueChange={(v: string) =>
                        setForm((f) => ({ ...f, frequency: v }))
                      }
                    >
                      <Select.Trigger />
                      <Select.Content>
                        {frequencyOptions.map((f: string) => (
                          <Select.Item key={f} value={f}>
                            {f}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                    </Flex>
                  </Box>

                <Flex gap="3" wrap="wrap">
                  <Box style={{ minWidth: 180 }}>
                    <Flex direction="column" gap="2">
                      <Text size="2" weight="medium">
                        Color
                      </Text>
                      <Select.Root
                        value={form.color}
                      onValueChange={(v: string) =>
                        setForm((f) => ({ ...f, color: v }))
                      }
                    >
                      <Select.Trigger />
                      <Select.Content>
                        {colorOptions.map((c: string) => (
                          <Select.Item key={c} value={c}>
                            {c}
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Root>
                    </Flex>
                  </Box>

                  <Box style={{ minWidth: 180 }}>
                    <Flex direction="column" gap="2">
                    <Text size="2" weight="medium">
                      Icon (emoji)
                    </Text>
                    <TextField.Root
                      placeholder="e.g., 🥤"
                      value={form.icon}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setForm((f) => ({ ...f, icon: e.target.value }))
                      }
                      maxLength={4}
                    />
                    </Flex>
                  </Box>
                </Flex>

                <Flex justify="end" gap="3" mt="2">
                  <Dialog.Close>
                    <Button variant="soft" onClick={resetForm} type="button">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button type="submit">Create Habit</Button>
                </Flex>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </div>
  );
}

export default Habits;
