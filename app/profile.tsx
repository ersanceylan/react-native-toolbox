import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  const tags = [
    "Java",
    "Kotlin",
    "JavaScript",
    "TypeScript",
    "React Native",
    "React",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Ersan Ceylan</Text>
        <Text style={styles.subtitle}>Software Engineer</Text>
        <Text style={[styles.subtitle, { fontWeight: "200" }]}>
          <Link
            style={{
              textDecorationLine: "underline",
            }}
            href="https://ersanceylan.com/contact"
          >
            ersanceylan.com/contact
          </Link>
        </Text>
      </View>
      <View style={styles.tagsContainer}>
        {tags.map((tag) => (
          <Text style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    gap: 30,
  },
  titleContainer: {
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#050505",
  },
  subtitle: {
    fontSize: 16,
    color: "#050505",
  },
  tagsContainer: {
    width: "50%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tag: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#050505",
    borderRadius: 5,
    color: "#ffffff",
  },
  contactContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  contactTitle: {
    fontSize: 16,
    color: "#050505",
  },
  contactValue: {
    fontSize: 14,
    color: "#050505",
  },
});
