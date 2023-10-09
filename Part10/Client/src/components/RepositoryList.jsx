import { FlatList, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";

function RepositoryList() {
  const [sortingMethod, setSortingMethod] = useState("CREATED_AT");
  const { repositories, refetch } = useRepositories();
  const navigate = useNavigate();

  useEffect(() => {
    switch (sortingMethod) {
      case "CREATED_AT":
        refetch({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
      case "RATING_AVERAGE":
        refetch({ orderBy: "RATING_AVERAGE", orderDirection: "DESC" });
        break;
      case "RATING_AVERAGE_ASC":
        refetch({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
        break;
    }
  }, [sortingMethod]);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => (
          <Picker
            selectedValue={sortingMethod}
            onValueChange={(itemValue) => {
              setSortingMethod(itemValue);
            }}
          >
            <Picker.Item label="Latest Repositories" value="CREATED_AT" />
            <Picker.Item
              label="Highest Rated Repositories"
              value="RATING_AVERAGE"
            />
            <Picker.Item
              label="Lowest Rated Repositories"
              value="RATING_AVERAGE_ASC"
            />
          </Picker>
        )}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )}
      />
    </>
  );
}

export default RepositoryList;
