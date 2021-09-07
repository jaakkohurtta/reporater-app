import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import RepositoryItem from "./RepositoryItem";

import useRepositories from "../../hooks/useRepositories";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

const Separator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <View style={styles.container}>
      <FlatList
        data={repositoryNodes}
        renderItem={({ item }) => <RepositoryItem key={item.id} repo={item} />}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

export default RepositoryList;
