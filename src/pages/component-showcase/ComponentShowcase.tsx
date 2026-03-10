import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@shared/theme";
import { typo, shapes } from "@shared/tokens";
import {
  Avatar,
  Badge,
  Dot,
  FilledButton,
  TextButton,
  IconButton,
  SegmentedButton,
  Checkbox,
  Dialog,
  Dropdown,
  Indicator,
  Switcher,
  DatePicker,
  TimePicker,
  Progress,
  CircularProgress,
  Switch,
  Tab,
  Tag,
  TextField,
  FilledTextField,
  toast,
  TopNavBar,
  useOverlay,
} from "@shared/ui";
import {
  Bell,
  Calendar,
  Gear,
  Home,
  Person,
  Checkmark,
  ChevronRight,
  Plus,
  Close,
  MagnifyingGlass,
  Bus,
  Crown,
  Megaphone as MegaphoneMono,
  Menu,
} from "@shared/icons/mono";
import {
  School,
  Trophy,
  Smile,
  MusicalNote,
  Globe,
  CookedRice,
  CreditCard,
  Bullseye,
} from "@shared/icons/illustration";

/* ───────── Section wrapper ───────── */

const Section = ({
  title,
  children,
  colors,
}: {
  title: string;
  children: React.ReactNode;
  colors: ReturnType<typeof useTheme>["colors"];
}) => (
  <View style={sectionStyles.container}>
    <Text style={[sectionStyles.title, { color: colors.text.primary }]}>
      {title}
    </Text>
    <View style={[sectionStyles.card, { backgroundColor: colors.background.surface }]}>
      {children}
    </View>
  </View>
);

const sectionStyles = StyleSheet.create({
  container: { gap: 12 },
  title: { ...typo("Heading1", "Bold"), paddingHorizontal: 4 },
  card: {
    borderRadius: shapes.large,
    padding: 20,
    gap: 16,
  },
});

/* ───────── Row helpers ───────── */

const Row = ({ children, gap = 12 }: { children: React.ReactNode; gap?: number }) => (
  <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap }}>
    {children}
  </View>
);

const Label = ({
  text,
  colors,
}: {
  text: string;
  colors: ReturnType<typeof useTheme>["colors"];
}) => (
  <Text style={[{ color: colors.text.secondary }, typo("Caption1", "Medium")]}>
    {text}
  </Text>
);

/* ───────── Dialog Demo (needs overlay) ───────── */

const DialogDemo = () => {
  const overlay = useOverlay();

  const openDialog = useCallback(() => {
    overlay.open(({ isOpen, close, setDimClickHandler }) => (
      <Dialog
        open={isOpen}
        title="Dialog Title"
        description="This is a dialog description. It supports multiline text."
        closeOnDimmerClick
        onClose={close}
        setDimClickHandler={setDimClickHandler}
      >
        <Dialog.TextButton onPress={close}>Cancel</Dialog.TextButton>
        <Dialog.FilledButton role="primary" onPress={close}>
          Confirm
        </Dialog.FilledButton>
      </Dialog>
    ));
  }, [overlay]);

  const openWiggleDialog = useCallback(() => {
    overlay.open(({ isOpen, close, setDimClickHandler }) => (
      <Dialog
        open={isOpen}
        title="Wiggle Dialog"
        description="Click the dimmer to see the wiggle effect. closeOnDimmerClick is disabled."
        onClose={close}
        setDimClickHandler={setDimClickHandler}
      >
        <Dialog.FilledButton role="primary" onPress={close}>
          Close
        </Dialog.FilledButton>
      </Dialog>
    ));
  }, [overlay]);

  return (
    <View style={{ gap: 12 }}>
      <Row>
        <FilledButton role="primary" size="mideum" onPress={openDialog}>
          Open Dialog
        </FilledButton>
        <FilledButton role="assistive" size="mideum" onPress={openWiggleDialog}>
          Wiggle Dialog
        </FilledButton>
      </Row>
    </View>
  );
};

/* ───────── Picker Demo ───────── */

const PickerDemo = ({ colors }: { colors: ReturnType<typeof useTheme>["colors"] }) => {
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 2, 7));
  const [selectedTime, setSelectedTime] = useState({ hour: 14, minute: 30 });
  const overlay = useOverlay();

  const openDatePicker = useCallback(() => {
    overlay.open(({ close, setDimClickHandler }) => (
      <DatePicker
        date={selectedDate}
        onChangeDate={(d: Date) => setSelectedDate(d)}
        onClose={close}
        closeOnDimmerClick
        setDimClickHandler={setDimClickHandler}
      />
    ));
  }, [overlay, selectedDate]);

  const openTimePicker = useCallback(() => {
    overlay.open(({ close, setDimClickHandler }) => (
      <TimePicker
        time={selectedTime}
        onChangeTime={(t: { hour: number; minute: number }) => setSelectedTime(t)}
        onClose={close}
        closeOnDimmerClick
        setDimClickHandler={setDimClickHandler}
      />
    ));
  }, [overlay, selectedTime]);

  return (
    <View style={{ gap: 16 }}>
      <Label text="Date Picker" colors={colors} />
      <FilledButton role="assistive" size="small" onPress={openDatePicker}>
        {`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`}
      </FilledButton>

      <Label text="Time Picker" colors={colors} />
      <FilledButton role="assistive" size="small" onPress={openTimePicker}>
        {`${String(selectedTime.hour).padStart(2, "0")}:${String(selectedTime.minute).padStart(2, "0")}`}
      </FilledButton>
    </View>
  );
};

/* ═══════════════════════════════════════════════════════ */
/*                  COMPONENT SHOWCASE                     */
/* ═══════════════════════════════════════════════════════ */

export const ComponentShowcase = () => {
  const { colors, mode, toggleTheme } = useTheme();

  /* ── state ── */
  const [checkFilled, setCheckFilled] = useState(true);
  const [checkOutlined, setCheckOutlined] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [switchOff, setSwitchOff] = useState(false);
  const handleSwitchOn = useCallback(() => setSwitchOn((v) => !v), []);
  const handleSwitchOff = useCallback(() => setSwitchOff((v) => !v), []);
  const [tabIndex, setTabIndex] = useState(0);
  const [textValue, setTextValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [filledTextValue, setFilledTextValue] = useState("");
  const [filledPasswordValue, setFilledPasswordValue] = useState("");
  const [dropdownValue, setDropdownValue] = useState("Option A");
  const [indicatorPage, setIndicatorPage] = useState(0);
  const [segmentData, setSegmentData] = useState([
    { text: "First", isActive: true, value: "first" },
    { text: "Second", isActive: false, value: "second" },
    { text: "Third", isActive: false, value: "third" },
  ]);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.background.surface }]}>
      <StatusBar barStyle={mode === "dark" ? "light-content" : "dark-content"} />

      {/* ── Top Nav ── */}
      <TopNavBar
        left={<TopNavBar.BackButton onPress={() => toast("Back pressed")} />}
        right={
          <IconButton
            icon={<Gear size={20} color={colors.text.primary} />}
            onPress={toggleTheme}
          />
        }
      >
        <TopNavBar.Title hasBackButton>Component Showcase</TopNavBar.Title>
      </TopNavBar>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Theme Toggle ── */}
        <Section title="Theme" colors={colors}>
          <Row>
            <FilledButton
              role={mode === "light" ? "primary" : "assistive"}
              size="mideum"
              onPress={() => toggleTheme()}
            >
              {mode === "light" ? "Light Mode" : "Dark Mode"}
            </FilledButton>
          </Row>
        </Section>

        {/* ── Avatar ── */}
        <Section title="Avatar" colors={colors}>
          <Row>
            <Avatar size={24} />
            <Avatar size={36} />
            <Avatar size={48} />
            <Avatar size={64} />
          </Row>
        </Section>

        {/* ── Badge + Dot ── */}
        <Section title="Badge & Dot" colors={colors}>
          <Row>
            <Badge number={1} />
            <Badge number={5} />
            <Badge number={42} />
            <Badge number={100} />
          </Row>
          <Row>
            <Dot size={6} />
            <Dot size={8} />
            <Dot size={10} />
            <Dot size={12} />
          </Row>
        </Section>

        {/* ── Buttons ── */}
        <Section title="FilledButton" colors={colors}>
          <Row>
            <FilledButton role="primary" size="large" onPress={() => toast("Primary Large")}>
              Primary
            </FilledButton>
            <FilledButton role="negative" size="mideum" onPress={() => {}}>
              Negative
            </FilledButton>
            <FilledButton role="assistive" size="small" onPress={() => {}}>
              Assistive
            </FilledButton>
          </Row>
          <Row>
            <FilledButton role="primary" size="mideum" disabled>
              Disabled
            </FilledButton>
          </Row>
          <Label text="display=fill (균등 분배)" colors={colors} />
          <Row>
            <FilledButton role="primary" size="mideum" display="fill" onPress={() => {}}>
              Fill 1
            </FilledButton>
            <FilledButton role="assistive" size="mideum" display="fill" onPress={() => {}}>
              Fill 2
            </FilledButton>
          </Row>
          <Row>
            <FilledButton role="primary" size="mideum" display="fill" onPress={() => {}}>
              A
            </FilledButton>
            <FilledButton role="negative" size="mideum" display="fill" onPress={() => {}}>
              B
            </FilledButton>
            <FilledButton role="assistive" size="mideum" display="fill" onPress={() => {}}>
              C
            </FilledButton>
          </Row>
        </Section>

        <Section title="TextButton" colors={colors}>
          <Row>
            <TextButton size="large" onPress={() => {}}>
              Large
            </TextButton>
            <TextButton size="mideum" onPress={() => {}}>
              Medium
            </TextButton>
            <TextButton size="small" onPress={() => {}}>
              Small
            </TextButton>
          </Row>
          <Label text="display=fill (균등 분배)" colors={colors} />
          <Row>
            <TextButton size="mideum" display="fill" onPress={() => {}}>
              Fill 1
            </TextButton>
            <TextButton size="mideum" display="fill" onPress={() => {}}>
              Fill 2
            </TextButton>
          </Row>
        </Section>

        <Section title="IconButton" colors={colors}>
          <Row>
            <IconButton icon={<Bell size={20} color={colors.text.primary} />} onPress={() => toast("Bell")} />
            <IconButton icon={<Calendar size={20} color={colors.text.primary} />} onPress={() => {}} />
            <IconButton icon={<Home size={20} color={colors.text.primary} />} onPress={() => {}} />
            <IconButton icon={<Plus size={20} color={colors.text.primary} />} onPress={() => {}} />
            <IconButton icon={<MagnifyingGlass size={20} color={colors.text.primary} />} onPress={() => {}} />
          </Row>
        </Section>

        <Section title="SegmentedButton" colors={colors}>
          <SegmentedButton data={segmentData} setData={setSegmentData} />
        </Section>

        {/* ── Checkbox ── */}
        <Section title="Checkbox" colors={colors}>
          <Label text="Filled" colors={colors} />
          <Row>
            <Checkbox
              selected={checkFilled}
              onPress={() => setCheckFilled((v) => !v)}
              type="primary"
              variant="filled"
            />
            <Checkbox
              selected={checkFilled}
              onPress={() => setCheckFilled((v) => !v)}
              type="error"
              variant="filled"
            />
            <Checkbox selected={false} onPress={() => {}} type="primary" variant="filled" />
          </Row>
          <Label text="Outlined" colors={colors} />
          <Row>
            <Checkbox
              selected={checkOutlined}
              onPress={() => setCheckOutlined((v) => !v)}
              type="primary"
              variant="outlined"
            />
            <Checkbox
              selected={checkOutlined}
              onPress={() => setCheckOutlined((v) => !v)}
              type="error"
              variant="outlined"
            />
            <Checkbox selected={false} onPress={() => {}} type="primary" variant="outlined" />
          </Row>
          <Label text="Size" colors={colors} />
          <Row>
            <Checkbox
              size="medium"
              selected={checkFilled}
              onPress={() => setCheckFilled((v) => !v)}
              type="primary"
              variant="filled"
            />
            <Checkbox
              size="small"
              selected={checkFilled}
              onPress={() => setCheckFilled((v) => !v)}
              type="primary"
              variant="filled"
            />
          </Row>
          <Label text="Disabled" colors={colors} />
          <Row>
            <Checkbox selected disabled onPress={() => {}} type="primary" variant="filled" />
            <Checkbox selected={false} disabled onPress={() => {}} type="primary" variant="filled" />
            <Checkbox selected disabled onPress={() => {}} type="primary" variant="outlined" />
            <Checkbox selected={false} disabled onPress={() => {}} type="primary" variant="outlined" />
          </Row>
        </Section>

        {/* ── Switch ── */}
        <Section title="Switch" colors={colors}>
          <Row>
            <Switch checked={switchOn} onChange={handleSwitchOn} size="medium" />
            <Label text={switchOn ? "On" : "Off"} colors={colors} />
          </Row>
          <Row>
            <Switch checked={switchOff} onChange={handleSwitchOff} size="small" />
            <Label text={switchOff ? "On" : "Off"} colors={colors} />
          </Row>
        </Section>

        {/* ── Tag ── */}
        <Section title="Tag" colors={colors}>
          <Row>
            <Tag text="Blue" color="blue" />
            <Tag text="Red" color="red" />
            <Tag text="Default" color="default" />
          </Row>
        </Section>

        {/* ── Progress ── */}
        <Section title="Progress" colors={colors}>
          <Label text="Linear Progress (65%)" colors={colors} />
          <Progress progress={65} />
          <Label text="Linear Progress (30%)" colors={colors} />
          <Progress progress={30} />
        </Section>

        <Section title="Circular Progress" colors={colors}>
          <Row>
            <CircularProgress progress={75} />
            <CircularProgress progress={25} />
            <CircularProgress progress={100} />
          </Row>
        </Section>

        {/* ── Tab ── */}
        <Section title="Tab" colors={colors}>
          <Tab onChange={setTabIndex}>
            <Tab.Item selected={tabIndex === 0}>Home</Tab.Item>
            <Tab.Item selected={tabIndex === 1}>Search</Tab.Item>
            <Tab.Item selected={tabIndex === 2}>Profile</Tab.Item>
          </Tab>
          <Text style={[{ color: colors.text.secondary }, typo("Body1", "Medium")]}>
            Selected tab: {tabIndex}
          </Text>
        </Section>

        {/* ── TextField ── */}
        <Section title="TextField" colors={colors}>
          <TextField
            type="text"
            label="Standard"
            placeholder="Enter text..."
            value={textValue}
            onChangeText={setTextValue}
          />
          <TextField
            type="password"
            label="Password"
            placeholder="Enter password..."
            value={passwordValue}
            onChangeText={setPasswordValue}
          />
          <TextField
            type="text"
            label="With Error"
            placeholder="Error state"
            value=""
            onChangeText={() => {}}
            isError
            supportingText="This field has an error"
          />
        </Section>

        <Section title="FilledTextField" colors={colors}>
          <FilledTextField
            type="text"
            label="Filled"
            placeholder="Enter text..."
            value={filledTextValue}
            onChangeText={setFilledTextValue}
          />
          <FilledTextField
            type="password"
            label="Password"
            placeholder="Enter password..."
            value={filledPasswordValue}
            onChangeText={setFilledPasswordValue}
          />
        </Section>

        {/* ── Dropdown ── */}
        <Section title="Dropdown" colors={colors}>
          <Dropdown
            items={["Option A", "Option B", "Option C", "Option D"]}
            value={dropdownValue}
            onSelectedItemChange={setDropdownValue}
          />
        </Section>

        {/* ── Indicator ── */}
        <Section title="Indicator" colors={colors}>
          <Indicator current={indicatorPage} total={5} onChangePage={setIndicatorPage} />
          <Text style={[{ color: colors.text.secondary, textAlign: "center" }, typo("Caption1", "Medium")]}>
            Page: {indicatorPage + 1} / 5
          </Text>
        </Section>

        {/* ── Switcher ── */}
        <Section title="Switcher" colors={colors}>
          <View style={{ height: 60, justifyContent: "center" }}>
            <Switcher
              pages={[
                <Text key={0} style={{ color: colors.text.primary, ...typo("Body1", "Medium") }}>
                  Page 1 Content
                </Text>,
                <Text key={1} style={{ color: colors.text.primary, ...typo("Body1", "Medium") }}>
                  Page 2 Content
                </Text>,
                <Text key={2} style={{ color: colors.text.primary, ...typo("Body1", "Medium") }}>
                  Page 3 Content
                </Text>,
              ]}
              current={indicatorPage < 3 ? indicatorPage : 0}
            />
          </View>
          <Label text="Use Indicator above to switch pages" colors={colors} />
        </Section>

        {/* ── Dialog ── */}
        <Section title="Dialog" colors={colors}>
          <DialogDemo />
        </Section>

        {/* ── Toast ── */}
        <Section title="Toast" colors={colors}>
          <Row>
            <FilledButton role="primary" size="small" onPress={() => toast("Default toast")}>
              Default
            </FilledButton>
            <FilledButton role="negative" size="small" onPress={() => toast.success("Success!")}>
              Success
            </FilledButton>
            <FilledButton role="assistive" size="small" onPress={() => toast.error("Error occurred")}>
              Error
            </FilledButton>
          </Row>
          <Row>
            <FilledButton role="assistive" size="small" onPress={() => toast.warning("Warning!")}>
              Warning
            </FilledButton>
            <FilledButton
              role="assistive"
              size="small"
              onPress={() => toast("Top toast", { position: "top" })}
            >
              Top Position
            </FilledButton>
          </Row>
          <Label text="Custom Icon" colors={colors} />
          <Row>
            <FilledButton
              role="assistive"
              size="small"
              onPress={() => toast("Bell icon toast", { icon: <Bell size={20} color={colors.text.primary} /> })}
            >
              Bell
            </FilledButton>
            <FilledButton
              role="assistive"
              size="small"
              onPress={() => toast("Calendar icon toast", { icon: <Calendar size={20} color={colors.brand.primary} /> })}
            >
              Calendar
            </FilledButton>
          </Row>
        </Section>

        {/* ── Pickers ── */}
        <Section title="Date & Time Pickers" colors={colors}>
          <PickerDemo colors={colors} />
        </Section>

        {/* ── Mono Icons ── */}
        <Section title="Mono Icons (Sample)" colors={colors}>
          <Row gap={16}>
            <Bell size={24} color={colors.text.primary} />
            <Calendar size={24} color={colors.text.primary} />
            <Gear size={24} color={colors.text.primary} />
            <Home size={24} color={colors.text.primary} />
            <Person size={24} color={colors.text.primary} />
            <Checkmark size={24} color={colors.text.primary} />
            <ChevronRight size={24} color={colors.text.primary} />
            <Plus size={24} color={colors.text.primary} />
            <Close size={24} color={colors.text.primary} />
            <MagnifyingGlass size={24} color={colors.text.primary} />
          </Row>
          <Row gap={16}>
            <Bus size={24} color={colors.text.primary} />
            <Crown size={24} color={colors.text.primary} />
            <MegaphoneMono size={24} color={colors.text.primary} />
            <Menu size={24} color={colors.text.primary} />
          </Row>
        </Section>

        {/* ── Illustration Icons ── */}
        <Section title="Illustration Icons (Sample)" colors={colors}>
          <Row gap={16}>
            <School size={24} />
            <Trophy size={24} />
            <Smile size={24} />
            <MusicalNote size={24} />
          </Row>
          <Row gap={16}>
            <Globe size={24} />
            <CookedRice size={24} />
            <CreditCard size={24} />
            <Bullseye size={24} />
          </Row>
        </Section>

        {/* ── Bottom spacer ── */}
        <View style={{ height: 60 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    gap: 32,
  },
});
