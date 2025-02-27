import {
  Bookmark,
  CornerUpRight,
  MessageSquarePlus,
  Star,
} from "@tamagui/lucide-icons";
import {
  Button,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
  useTheme,
} from "tamagui";

import PlaceDetailsContacts from "./PlaceDetailsContacts";
import { Coordinate } from "@/models/Coordinate";
import usePlace from "@/hooks/usePlace";
import PlaceReviews from "./PlaceReviews";

interface Props {
  query: string | number | Coordinate;
}

export default function PlaceDetails({ query }: Props) {
  const theme = useTheme();

  const { data, isLoading, error, refetch } = usePlace(query);

  return (
    <View width="100%" height="100%">
      {isLoading ? (
        <View flex={1} alignItems="center" justifyContent="center">
          <Spinner size="large" color="$color" />
        </View>
      ) : null}

      {error ? (
        <View
          flex={1}
          alignItems="center"
          justifyContent="center"
          paddingHorizontal="$4"
          gap="$4"
        >
          <Text textWrap="balance" textAlign="center" color="$red11">
            Ha ocurrido un error obteniendo la información del lugar.
          </Text>
          <Button onPress={() => refetch()}>Reintentar</Button>
        </View>
      ) : null}

      {data ? (
        <View flex={1}>
          <View
            gap="$2"
            borderBottomColor="$borderColor"
            borderBottomWidth="$0.5"
            padding="$4"
          >
            <Text fontSize="$8" numberOfLines={2}>
              {data.details.name}
            </Text>
            <Text fontSize="$4" color="$color11" textTransform="capitalize">
              {data.details.category.replaceAll("_", " ")}
            </Text>
            <View gap="$1.5">
              <View flexDirection="row" alignItems="center" gap="$2">
                <Text fontSize="$1" color="$color11">
                  5.0
                </Text>
                <View flexDirection="row" gap="$1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      fill={theme.yellow9.get()}
                      strokeWidth={0}
                      size={14}
                    />
                  ))}
                </View>
                <Text fontSize="$1" color="$color11">
                  (83)
                </Text>
              </View>
            </View>

            <View marginTop="$2">
              <ScrollView horizontal>
                <View flexDirection="row" gap="$2">
                  <Button themeInverse size="$3.5" icon={<MessageSquarePlus />}>
                    Publicar
                  </Button>
                  <Button size="$3.5" icon={<CornerUpRight />}>
                    Direcciones
                  </Button>
                  <Button size="$3.5" icon={<Bookmark />}>
                    Guardar
                  </Button>
                </View>
              </ScrollView>
            </View>
          </View>

          <ScrollView>
            <View gap="$4" paddingVertical="$4" paddingBottom="$13">
              <PlaceDetailsContacts
                address={data.details.address}
                contacts={data.details.contacts}
              />

              <View>
                <ScrollView horizontal>
                  <View flexDirection="row" gap="$4" paddingHorizontal="$4">
                    <View
                      borderRadius="$radius.4"
                      overflow="hidden"
                      height="$20"
                      aspectRatio="1/1"
                    >
                      <Image
                        source={{
                          uri: "https://picsum.photos/600/600",
                          width: 200,
                          height: 300,
                        }}
                        width="100%"
                        height="100%"
                      />
                    </View>
                    <View
                      borderRadius="$radius.4"
                      overflow="hidden"
                      height="$20"
                      aspectRatio="1/1"
                    >
                      <Image
                        source={{
                          uri: "https://picsum.photos/600/800",
                          width: 200,
                          height: 300,
                        }}
                        width="100%"
                        height="100%"
                      />
                    </View>
                  </View>
                </ScrollView>
              </View>

              <Text paddingHorizontal="$4">Reseñas</Text>
              <PlaceReviews placeId={data.id} />
            </View>
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}
