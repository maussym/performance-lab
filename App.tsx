// 2-3
//Before
// import React, { useState } from "react";
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";

// const DATA = Array.from({ length: 2000 }, (_, i) => ({
//   id: i,
//   name: `Поле №${i + 1}`,
//   area: Math.round(Math.random() * 500),
// }));

// export default function App() {
//   const [selected, setSelected] = useState<number | null>(null);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.header}>Список полей ({DATA.length})</Text>
//       {DATA.map((item) => (
//         <TouchableOpacity
//           key={item.id}
//           style={{
//             padding: 16,
//             borderBottomWidth: 1,
//             borderBottomColor: "#eee",
//             backgroundColor: selected === item.id ? "#e8f0e9" : "#fff",
//           }}
//           onPress={() => setSelected(item.id)}
//         >
//           <Text style={{ fontSize: 16 }}>{item.name}</Text>
//           <Text style={{ fontSize: 13, color: "#888" }}>{item.area} га</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 60 },
//   header: { fontSize: 20, fontWeight: "bold", paddingHorizontal: 16, marginBottom: 10 },
// });


// After 4-5
// import React, { useState, useCallback } from "react";
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

// const DATA = Array.from({ length: 2000 }, (_, i) => ({
//   id: i,
//   name: `Поле №${i + 1}`,
//   area: Math.round(Math.random() * 500),
// }));

// // 1. Вынесли элемент в отдельный компонент и обернули в React.memo
// const FieldItem = React.memo(function FieldItem({
//   item,
//   isSelected,
//   onPress,
// }: {
//   item: { id: number; name: string; area: number };
//   isSelected: boolean;
//   onPress: (id: number) => void;
// }) {
//   return (
//     <TouchableOpacity
//       style={[styles.item, isSelected && styles.itemSelected]}
//       onPress={() => onPress(item.id)}
//     >
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.area}>{item.area} га</Text>
//     </TouchableOpacity>
//   );
// });

// export default function App() {
//   const [selected, setSelected] = useState<number | null>(null);

//   // 2. Обернули обработчик в useCallback — стабильная ссылка
//   const handlePress = useCallback((id: number) => {
//     setSelected(id);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Список полей ({DATA.length})</Text>
//       {/* 3. FlatList вместо ScrollView */}
//       <FlatList
//         data={DATA}
//         keyExtractor={(item) => String(item.id)}
//         renderItem={({ item }) => (
//           <FieldItem
//             item={item}
//             isSelected={selected === item.id}
//             onPress={handlePress}
//           />
//         )}
//         initialNumToRender={15}
//         windowSize={10}
//         removeClippedSubviews
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 60 },
//   header: { fontSize: 20, fontWeight: "bold", paddingHorizontal: 16, marginBottom: 10 },
//   item: { padding: 16, borderBottomWidth: 1, borderBottomColor: "#eee", backgroundColor: "#fff" },
//   itemSelected: { backgroundColor: "#e8f0e9" },
//   name: { fontSize: 16 },
//   area: { fontSize: 13, color: "#888" },
// });






// 6-7
// import React, { useState, useMemo } from "react";
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

// // большой массив чисел
// const NUMBERS = Array.from({ length: 20000 }, (_, i) => Math.round(Math.random() * 100000));

// // специально тяжёлая функция: сортировка + фильтрация 20000 чисел
// function heavyCompute(nums: number[]) {
//   const sorted = [...nums].sort((a, b) => a - b);
//   const filtered = sorted.filter((n) => n % 7 === 0);
//   const sum = filtered.reduce((acc, n) => acc + n, 0);
//   return { count: filtered.length, sum };
// }

// export default function App() {
//   const [count, setCount] = useState(0);

//   // ПРОБЛЕМА: heavyCompute вызывается на КАЖДЫЙ рендер,
//   // даже когда меняется только счётчик и NUMBERS не трогается
//   const result = heavyCompute(NUMBERS);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Счётчик: {count}</Text>

//       <TouchableOpacity style={styles.button} onPress={() => setCount((c) => c + 1)}>
//         <Text style={styles.buttonText}>Нажми меня (+1)</Text>
//       </TouchableOpacity>

//       <View style={styles.result}>
//         <Text>Чисел, кратных 7: {result.count}</Text>
//         <Text>Их сумма: {result.sum}</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 100, paddingHorizontal: 20 },
//   header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
//   button: { backgroundColor: "#2f6b3b", padding: 16, borderRadius: 8, alignItems: "center" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   result: { marginTop: 24 },
// });





//8 
// import React, { useState, useMemo } from "react";
// import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

// // имитируем данные полей с координатами (как приходят из БД)
// const FIELDS = Array.from({ length: 3000 }, (_, i) => ({
//   id: i,
//   name: `Поле №${i + 1}`,
//   lat: 51 + Math.random(),
//   lng: 71 + Math.random(),
//   area: Math.round(Math.random() * 500),
// }));

// // тяжёлая сборка GeoJSON из полей (имитация useFieldsGeoJsonForMap)
// function buildGeoJson(fields: typeof FIELDS) {
//   return {
//     type: "FeatureCollection",
//     features: fields.map((f) => ({
//       type: "Feature",
//       geometry: { type: "Point", coordinates: [f.lng, f.lat] },
//       properties: { id: f.id, name: f.name, area: f.area },
//     })),
//   };
// }

// export default function App() {
//   const [zoom, setZoom] = useState(1);


//   // ПЛОХО: GeoJSON пересобирается на КАЖДЫЙ рендер (каждое нажатие zoom)
//   // const geoJson = buildGeoJson(FIELDS);

//   // ХОРОШО: собирается один раз, зум его не трогает
//   const geoJson = useMemo(() => buildGeoJson(FIELDS), []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Карта полей (zoom: {zoom})</Text>

//       <TouchableOpacity style={styles.button} onPress={() => setZoom((z) => z + 1)}>
//         <Text style={styles.buttonText}>Приблизить (имитация пан/зум карты)</Text>
//       </TouchableOpacity>

//       <Text style={styles.info}>
//         Точек на карте: {geoJson.features.length}
//       </Text>
//       <Text style={styles.hint}>
//         Каждое нажатие «Приблизить» = перерисовка карты (как пан/зум)
//       </Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 100, paddingHorizontal: 20 },
//   header: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
//   button: { backgroundColor: "#2f6b3b", padding: 16, borderRadius: 8, alignItems: "center" },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
//   info: { marginTop: 24, fontSize: 16 },
//   hint: { marginTop: 8, color: "#888", fontSize: 13 },
// });





// 9
import React, { useState, useMemo, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

const DATA = Array.from({ length: 5000 }, (_, i) => ({
  id: i,
  name: `Поле ${["Пшеница", "Ячмень", "Кукуруза", "Подсолнух"][i % 4]} №${i + 1}`,
}));

export default function App() {
  const [query, setQuery] = useState("");                     // что напечатано (мгновенно)
  const [debouncedQuery, setDebouncedQuery] = useState("");   // отложенное значение

  // дебаунс: debouncedQuery обновляется только через 300мс после последнего ввода
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    // если пользователь напечатал ещё символ раньше 300мс — старый таймер сбрасывается
    return () => clearTimeout(timer);
  }, [query]);

  // фильтрация завязана на ОТЛОЖЕННОЕ значение, а не на каждую букву
  const filtered = useMemo(() => {
    if (!debouncedQuery) return DATA;
    return DATA.filter((item) =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Поиск поля..."
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.counter}>Найдено: {filtered.length}</Text>
      <FlatList
        data={filtered}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
        initialNumToRender={15}
        windowSize={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, fontSize: 16 },
  counter: { marginVertical: 10, color: "#888" },
  item: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee" },
});



//1
// Установка и подготовка рабочей среды :)


//2
// Почему оно тормозит (три конкретные ошибки, которые тут заложены специально): 
// ScrollView вместо FlatList. ScrollView рендерит ВСЕ 2000 элементов сразу, даже те, что за экраном. 2000 компонентов в памяти разом это и есть тормоз на старте.
// Инлайн-стиль style={{ ... }}. Каждый элемент создаёт новый объект стиля при каждом рендере.
// Инлайн-функция onPress={() => setSelected(item.id)}. Новая функция для каждого из 2000 элементов на каждом рендере. 
// И вот главное: когда ты тыкаешь один элемент, selected меняется → перерисовывается весь список из 2000 штук, хотя изменился только один. Отсюда лаг при тапе.


//3
// C:\Users\imaus\performance-lab\notes\profiling-data.08.07.2026.12-57-20.json 
// Профайлер и замер «до». Освоены инструменты веб-профилирования: React DevTools Profiler (флейм-граф перерисовок,
// подсветка «Highlight updates», чтение «why did this render») и Frame Rendering Stats (FPS). 
// Зафиксированы метрики «до»: клик по одному элементу вызывает перерисовку всего списка (~2000 компонентов), FPS при скролле проседает. 
// Метрики записаны как точка отсчёта для сравнения после оптимизации.

// 4 - 5
// Оптимизация списка и замер результата. 
// Проведено сравнительное профилирование до и после оптимизации через экспорт данных React DevTools Profiler. 
// Результат подтверждён количественно: при клике по элементу число перерисованных fiber-узлов сократилось с 22010 до 264 (в ~83 раза), 
// время рендера — с ~430 мс до ~18 мс (в ~25 раз). 
// Понята природа цифр: один компонент разворачивается в несколько fiber-узлов, 
// а остаточные 264 узла в оптимизированной версии — это видимые элементы виртуализированного FlatList, а не весь список. 
// Освоен экспорт и разбор профилей для доказательного сравнения.

// 6 - 7  
// Оптимизация дорогого вычисления. 
// Воспроизведена проблема: тяжёлая функция (сортировка и фильтрация 20000 чисел) в теле компонента выполнялась на каждый рендер, 
// из-за чего простое изменение счётчика вызывало заметный лаг. 
// Проблема устранена оборачиванием вычисления в useMemo с пустым массивом зависимостей — функция считается один раз и переиспользуется, клик по счётчику стал мгновенным. 
// Закреплён критерий применимости: useMemo оправдан для дорогих вычислений (в отличие от списка, где он не потребовался), то есть инструмент подбирается под конкретную проблему.


// 8  
// Мемоизация сборки данных для карты. 
// На упрощённой модели (сборка GeoJSON из 3000 полей, 
// имитирующая боевой useFieldsGeoJsonForMap) воспроизведена проблема: тяжёлая сборка выполнялась на каждый рендер, 
// то есть на каждый пан/зум карты. Устранено через useMemo — GeoJSON собирается один раз и не пересобирается при перерисовке карты; 
// при изменении исходных данных пересборка управляется массивом зависимостей. 
// Установлена прямая связь с реальным проектом: именно так следует мемоизировать useFieldsGeoJsonForMap, чтобы карта не лагала при взаимодействии.


// 9 
// Дебаунс. Освоена техника отложенного запуска дорогих операций: введённое значение (query) обновляется мгновенно для отзывчивости поля, 
// а фильтрация завязана на отложенное значение (debouncedQuery), обновляемое только через 300 мс после последнего ввода. 
// Реализовано через useEffect + setTimeout с очисткой таймера в return. 
// Результат: при быстром вводе фильтрация запускается один раз вместо запуска на каждую букву. Применимо к поиску по полям, фильтрам на карте и запросам по мере ввода.
// Без дебаунса фильтрация (тяжёлый коммит ~50 мс) запускалась бы на каждую букву. 
// С дебаунсом видно чередование: набор букв даёт лёгкие коммиты по ~3 мс (обновляется только поле ввода), 
// а тяжёлая фильтрация срабатывает один раз после паузы. Дебаунс не ускоряет саму фильтрацию, а сокращает число её запусков.

