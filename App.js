import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Header from './components/Header';
import InputBar from './components/InputBar';
import TodoItem from './components/TodoItem';
import Modal from 'react-native-modal';


export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            visibleModal: null,
            todoInput: '',
            todos: [
                { id: 0, title: 'Take out the trash', done: false },
                { id: 1, title: 'Cook dinner', done: false }
            ]
        }
    }

    addNewTodo = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.button}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>Hello!</Text>
            {this._renderButton('Close', () => this.setState({ visibleModal: null }))}
        </View>
    );

    toggleDone(item) {
        let todos = this.state.todos;

        todos = todos.map((todo) => {
            if (todo.id == item.id) {
                todo.done = !todo.done;
            }

            return todo;
        })

        this.setState({ todos });
    }

    removeTodo(item) {
        let todos = this.state.todos;

        todos = todos.filter((todo) => todo.id !== item.id);

        this.setState({ todos });
    }

    render() {
        const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

        return (
            <View style={styles.container}>
                {statusbar}

                <Header title="Todoapp" />

                <InputBar
                    addNewTodo={() => this.addNewTodo()}
                    textChange={todoInput => this.setState({ todoInput })}
                    todoInput={this.state.todoInput}
                />

                <FlatList
                    data={this.state.todos}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TodoItem todoItem={item} toggleDone={() => this.toggleDone(item)} removeTodo={() => this.removeTodo(item)} />
                        )
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    statusbar: {
        backgroundColor: '#FFCE00',
        height: 20
    }
});
