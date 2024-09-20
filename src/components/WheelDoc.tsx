import React, { useState } from 'react'

const Tab = ({ children, isActive, onClick }: { children: React.ReactNode; isActive: boolean; onClick: () => void }) => (
  <button
    className={`px-4 py-2 font-semibold rounded-t-lg ${
      isActive
        ? 'bg-white text-gray-900 border-b-2 border-blue-500'
        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)

const ScrollArea = ({ children }: { children: React.ReactNode }) => (
  <div className="h-[calc(100vh-200px)] overflow-y-auto pr-4">{children}</div>
)

export const  WheelDocumentation = () => {
  const [activeTab, setActiveTab] = useState('game-logic')

  const tabs = [
    { id: 'game-logic', label: 'Общая логика' },
    { id: 'user-to-server', label: 'Сообщения к серверу' },
    { id: 'server-to-user', label: 'Сообщения от сервера' },
    { id: 'game-timing', label: 'Тайминг игры' },
  ]

  return (
    <div className="container mx-auto p-6 bg-white-100">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Wheel: Документация для фронтенд-разработчиков
      </h1>
      
      <div className="mb-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </Tab>
        ))}
      </div>
      
      {activeTab === 'game-logic' && (
        <ScrollArea>
          <h2 className="text-2xl font-semibold mb-4">Общая логика игры</h2>
          <p className="mb-4"><strong>Wheel</strong> — это игра с вращающимся колесом, в которой игроки могут делать ставки на определенные слоты (номера). Игра проходит в несколько этапов:</p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li><strong>Начало раунда</strong>: Колесо создает новый раунд с уникальным идентификатором игры (UUID). Игроки могут подключаться и делать ставки.</li>
            <li><strong>Ставки</strong>: Во время периода ставок игроки размещают свои ставки на определенные слоты (1-5).</li>
            <li><strong>Спин колеса</strong>: После завершения периода ставок колесо вращается, и случайный слот становится победителем.</li>
            <li><strong>Результаты</strong>: Игроки, которые сделали ставки на выигравший слот, делят выигрыш между собой.</li>
          </ol>
        </ScrollArea>
      )}
      
      {activeTab === 'user-to-server' && (
        <ScrollArea>
          <h2 className="text-2xl font-semibold mb-4">Сообщения от пользователя к серверу</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">auth — Авторизация пользователя</h3>
              <p className="mb-2">Описание: Запрос для авторизации пользователя по JWT-токену.</p>
              <p className="mb-2">Формат сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "type": "auth",
  "token": "JWT",
  "wheel_id": 1
}`}</code>
              </pre>
              <p className="mt-2">Ответ: Информация о текущей игре и балансе пользователя.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">bet — Размещение ставки</h3>
              <p className="mb-2">Описание: Пользователь размещает ставку на определённый слот во время активного раунда.</p>
              <p className="mb-2">Формат сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "type": "bet",
  "wheel_id": 1,
  "game_uuid": "уникальный идентификатор игры",
  "slot": 2
}`}</code>
              </pre>
              <p className="mt-2">Ответ: Сервер сообщает о новой ставке и обновленном общем банке.</p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">wheels_statistic — Получение статистики колеса</h3>
              <p className="mb-2">Описание: Запрос на получение статистики по каждому колесу, включая количество игроков и общие ставки.</p>
              <p className="mb-2">Формат сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "type": "wheels_statistic"
}`}</code>
              </pre>
              <p className="mt-2">Ответ: Статистика по активным колёсам.</p>
            </div>
          </div>
        </ScrollArea>
      )}
      
      {activeTab === 'server-to-user' && (
        <ScrollArea>
          <h2 className="text-2xl font-semibold mb-4">Сообщения от сервера к пользователю</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">auth — Ответ на авторизацию</h3>
              <p className="mb-2">Описание: Сервер подтверждает успешную авторизацию пользователя и отправляет текущее состояние игры.</p>
              <p className="mb-2">Пример сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "event": "auth",
  "current_game_uuid": "уникальный идентификатор игры",
  "current_game_state": "waiting",
  "current_history": [...],
  "coins": 100
}`}</code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">new_round — Начало нового раунда</h3>
              <p className="mb-2">Описание: Уведомление о начале нового раунда с уникальным идентификатором игры.</p>
              <p className="mb-2">Пример сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "event": "new_round",
  "game_uuid": "уникальный идентификатор игры",
  "total_bank": 100
}`}</code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">new_bet — Новая ставка</h3>
              <p className="mb-2">Описание: Уведомление об обновленном банке после новой ставки.</p>
              <p className="mb-2">Пример сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "event": "new_bet",
  "total_bank": 200
}`}</code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">spinning_start — Начало вращения колеса</h3>
              <p className="mb-2">Описание: Уведомление о начале вращения колеса.</p>
              <p className="mb-2">Пример сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "event": "spinning_start",
  "total_bank": 300
}`}</code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">spin_result — Результаты спина</h3>
              <p className="mb-2">Описание: Сообщение с результатами спина, включая выигрышный слот и сумму выигрыша.</p>
              <p className="mb-2">Пример сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "event": "spin_result",
  "win_amount": 100,
  "win_slot": 2,
  "game_uuid": "уникальный идентификатор игры"
}`}</code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-2">wheels_statistic — Статистика колеса</h3>
              <p className="mb-2">Описание: Статистика по всем активным колёсам.</p>
              <p className="mb-2">Пример сообщения:</p>
              <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
                <code>{`{
  "event": "wheels_statistic",
  "1": {
    "bet": 100,
    "players": 5
  },
  "2": {
    "bet": 200,
    "players": 3
  }
}`}</code>
              </pre>
            </div>
          </div>
        </ScrollArea>
      )}
      
      {activeTab === 'game-timing' && (
        <ScrollArea>
          <h2 className="text-2xl font-semibold mb-4">Тайминг игры</h2>
          <p className="mb-4">Игра делится на несколько фаз, каждая из которых запускается автоматически через определённые промежутки времени:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Новый раунд</strong>: Запускается каждые 17 секунд.</li>
            <li><strong>Ставки</strong>: Длительность периода ставок составляет 9 секунд.</li>
            <li><strong>Вращение колеса</strong>: Происходит в течение 5 секунд после окончания периода ставок.</li>
            <li><strong>Отображение результатов</strong>: После вращения колеса результаты показываются в течение 3 секунд, после чего начинается новый раунд.</li>
          </ul>
        </ScrollArea>
      )}
    </div>
  )
}