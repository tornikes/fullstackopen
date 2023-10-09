import { FlatList, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import ItemSeparator from "./ItemSeparator";
import { useNavigate } from "react-router-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useEffect } from "react";

// const _repositories = [
//   {
//     id: "jaredpalmer.formik",
//     fullName: "jaredpalmer/formik",
//     description: "Build forms in React, without the tears",
//     language: "TypeScript",
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
//   },
//   {
//     id: "rails.rails",
//     fullName: "rails/rails",
//     description: "Ruby on Rails",
//     language: "Ruby",
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
//   },
//   {
//     id: "django.django",
//     fullName: "django/django",
//     description: "The Web framework for perfectionists with deadlines.",
//     language: "Python",
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
//   },
//   {
//     id: "reduxjs.redux",
//     fullName: "reduxjs/redux",
//     description: "Predictable state container for JavaScript apps",
//     language: "TypeScript",
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
//   },
// ];

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
